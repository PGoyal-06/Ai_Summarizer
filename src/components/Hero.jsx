import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
      </nav>
      <h1 className="head_text">
        Summarize Content With <br className="max-md:hidden" />{" "}
        <span className="red_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Simplify your reading and viewing with Summafy, a summarizer that
        transforms lengthy articles and videos into clear and concise summaries
        and key points.
      </h2>
    </header>
  );
};

export default Hero;
