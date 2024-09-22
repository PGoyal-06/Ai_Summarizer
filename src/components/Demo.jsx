import React, { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";
import { useLazyGetVideoSummaryQuery } from "../services/youtube";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const openAiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const Demo = () => {
  const [input, setInput] = useState({
    url: "",
    summary: "",
    keyPoints: [],
    flashcards: [],
    questions: [],
  });

  const [allEntries, setAllEntries] = useState([]);
  const [copied, setCopied] = useState("");
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // RTK lazy queries
  const [getSummary, { error: articleError, isFetching: isFetchingArticle }] =
    useLazyGetSummaryQuery();
  const [getVideoSummary, { error: videoError, isFetching: isFetchingVideo }] =
    useLazyGetVideoSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const entriesFromLocalStorage = JSON.parse(localStorage.getItem("entries"));
    if (entriesFromLocalStorage) {
      setAllEntries(entriesFromLocalStorage);
    }
  }, []);

  const summarizeText = async (text) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Summarize the following text in a detailed manner, ensuring that all major points are covered:\n\n${text}`,
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error summarizing text:", error);
      return null;
    }
  };

  const extractKeyPoints = async (text) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Extract the key points from the following detailed summary. Ensure that each key point is complete and accurately represents the main ideas:\n\n${text}`,
              },
            ],
            max_tokens: 750,
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content
          .trim()
          .split("\n")
          .filter(Boolean);
      } else {
        console.error("Unexpected response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error extracting key points:", error);
      return [];
    }
  };

  const generateFlashcards = async (text) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Generate flashcards from the following text. Each flashcard should be a Q/A pair in the following format:\nQ: <question>\nA: <answer>\n\nText:\n\n${text}`,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const flashcardsText = data.choices[0].message.content
          .trim()
          .split("\n")
          .filter(Boolean);

        const flashcards = [];
        let currentFlashcard = {};

        flashcardsText.forEach((line) => {
          if (line.startsWith("Q:")) {
            if (currentFlashcard.question) {
              flashcards.push(currentFlashcard);
              currentFlashcard = {};
            }
            currentFlashcard.question = line.substring(3).trim();
          } else if (line.startsWith("A:")) {
            currentFlashcard.answer = line.substring(3).trim();
          }
        });

        if (currentFlashcard.question) {
          flashcards.push(currentFlashcard);
        }

        return flashcards;
      } else {
        console.error("Unexpected response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error generating flashcards:", error);
      return [];
    }
  };

  const generateQuestions = async (text) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openAiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Generate potential exam or quiz questions from the following text. Ensure each question is clear and concise:\n\n${text}`,
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          }),
        }
      );
      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        return data.choices[0].message.content
          .trim()
          .split("\n")
          .filter(Boolean);
      } else {
        console.error("Unexpected response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingEntry = allEntries.find((item) => item.url === input.url);

    if (existingEntry) return setInput(existingEntry);

    if (isYouTubeUrl(input.url)) {
      await handleVideoSubmit(input.url);
    } else {
      await handleArticleSubmit(input.url);
    }
  };

  const handleArticleSubmit = async (url) => {
    const { data } = await getSummary({ articleUrl: url });
    if (data?.summary) {
      const summary = data.summary;
      const keyPoints = await extractKeyPoints(summary);
      const flashcards = await generateFlashcards(summary);
      const questions = await generateQuestions(summary);
      const newEntry = {
        ...input,
        summary,
        keyPoints,
        flashcards,
        questions,
        type: "article",
      };
      const updatedAllEntries = [newEntry, ...allEntries];

      // update state and local storage
      setInput(newEntry);
      setAllEntries(updatedAllEntries);
      localStorage.setItem("entries", JSON.stringify(updatedAllEntries));
    }
  };

  const handleVideoSubmit = async (url) => {
    const videoId = extractVideoId(url);

    console.log("Submitting video ID:", videoId);

    try {
      const { data } = await getVideoSummary({
        video_id: videoId,
        platform: "youtube",
      });
      console.log("API response data:", data);

      if (data) {
        console.log("Response data structure:", data);
      }

      // Extract transcripts from data.transcripts.en_auto.auto and data.transcripts.en_auto.default
      const autoTranscripts = data?.data?.transcripts?.en_auto?.auto || [];
      const defaultTranscripts =
        data?.data?.transcripts?.en_auto?.default || [];
      const customTranscripts = data?.data?.transcripts?.en_auto?.custom || [];
      console.log("Auto Transcripts:", autoTranscripts);
      console.log("Default Transcripts:", defaultTranscripts);
      console.log("Custom Transcripts:", customTranscripts);

      // Concatenate the text from each transcript segment
      const autoSummary = autoTranscripts
        .map((segment) => segment.text)
        .join(" ");
      const defaultSummary = defaultTranscripts
        .map((segment) => segment.text)
        .join(" ");
      const customSummary = customTranscripts
        .map((segment) => segment.text)
        .join(" ");

      const fullTranscript = `${autoSummary} ${defaultSummary} ${customSummary}`;

      console.log("Full Transcript:", fullTranscript);

      if (fullTranscript.trim().length > 0) {
        const summary = await summarizeText(fullTranscript);
        const keyPoints = await extractKeyPoints(summary);
        const flashcards = await generateFlashcards(summary);
        const questions = await generateQuestions(summary);
        const newEntry = {
          ...input,
          summary,
          keyPoints,
          flashcards,
          questions,
          type: "video",
        };
        setInput(newEntry);

        const updatedAllEntries = [newEntry, ...allEntries];
        setAllEntries(updatedAllEntries);
        localStorage.setItem("entries", JSON.stringify(updatedAllEntries));
      } else {
        console.log("No summary found in the response.");
      }
    } catch (error) {
      console.error("Error fetching video summary:", error);
    }
  };

  const extractVideoId = (url) => {
    const urlParams = new URLSearchParams(new URL(url).search);
    const videoId = urlParams.get("v");
    console.log("Extracted video ID:", videoId);
    return videoId;
  };

  const isYouTubeUrl = (url) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return regex.test(url);
  };

  // Copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e, handler) => {
    if (e.keyCode === 13) {
      handler(e);
    }
  };

  // Clear browsing history
  const clearHistory = () => {
    localStorage.removeItem("entries");
    setAllEntries([]);
  };

  useEffect(() => {
    if (isFetchingVideo) {
      console.log("Fetching video summary...");
    }

    if (videoError) {
      console.error("Video summary fetch error:", videoError);
    }
  }, [isFetchingVideo, videoError]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcard((prevIndex) =>
      prevIndex === input.flashcards.length - 1 ? 0 : prevIndex + 1
    );
    setIsFlipped(false);
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcard((prevIndex) =>
      prevIndex === 0 ? input.flashcards.length - 1 : prevIndex - 1
    );
    setIsFlipped(false);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt="link-icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />

          <input
            type="url"
            placeholder="Paste the article or YouTube link"
            value={input.url}
            onChange={(e) => setInput({ ...input, url: e.target.value })}
            onKeyDown={(e) => handleKeyDown(e, handleSubmit)}
            required
            className="url_input peer"
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 "
          >
            <p>↵</p>
          </button>
        </form>

        <p className="para">
          Depending on the size of the video/article, generating a summary may
          take some time... please be patient. Thanks!
        </p>

        <button
          onClick={clearHistory}
          className="clear_btn mt-4 bg-red-500 text-white py-2 px-4 rounded"
        >
          Clear History
        </button>

        {/* Browse History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allEntries.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setInput(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetchingArticle || isFetchingVideo ? (
          <img src={loader} alt="loader" className="w-20 h-20 object-contain" />
        ) : articleError || videoError ? (
          <p className="font-inter font-bold text-black text-center">
            Well, that wasn't supposed to happen...
            <br />
            <span className="font-satoshi font-normal text-gray-700">
              {articleError?.data?.error || videoError?.data?.error}
            </span>
          </p>
        ) : (
          input.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                {input.type === "article" ? "Article" : "Video"}{" "}
                <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {input.summary}
                </p>
              </div>
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Key Points
              </h2>
              <ul className="list-disc pl-5">
                {input.keyPoints.map((point, index) => (
                  <li
                    key={index}
                    className="font-inter font-medium text-sm text-gray-700"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              {input.flashcards.length > 0 && (
                <div className="flex flex-col items-center">
                  <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                    Flashcards
                  </h2>
                  <div
                    className="flashcard bg-white p-5 rounded-lg shadow-md w-96 h-48 flex justify-center items-center cursor-pointer"
                    onClick={handleFlip}
                  >
                    <p className="font-inter font-medium text-lg text-gray-800">
                      {isFlipped
                        ? `A: ${input.flashcards[currentFlashcard].answer}`
                        : `Q: ${input.flashcards[currentFlashcard].question}`}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-center gap-4">
                    <button
                      className="previous_btn bg-blue-500 text-white py-2 px-4 rounded-l flex justify-center items-center"
                      onClick={handlePreviousFlashcard}
                    >
                      <FaArrowLeft size={20} />
                    </button>
                    <button
                      className="next_btn bg-blue-500 text-white py-2 px-4 rounded-r flex justify-center items-center"
                      onClick={handleNextFlashcard}
                    >
                      <FaArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}
              {input.questions.length > 0 && (
                <div>
                  <h2 className="font-satoshi font-bold text-gray-600 text-xl mt-6">
                    Potential Exam or Quiz Questions
                  </h2>
                  <ul className="list-disc pl-5">
                    {input.questions.map((question, index) => (
                      <li
                        key={index}
                        className="font-inter font-medium text-sm text-gray-700"
                      >
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
