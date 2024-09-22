import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = import.meta.env.VITE_RAPID_API_YOUTUBE_KEY;

export const youtubeApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://youtube-video-summarizer-gpt-ai.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set("x-rapidapi-key", rapidApiKey);
      headers.set("x-rapidapi-host", "youtube-video-summarizer-gpt-ai.p.rapidapi.com");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVideoSummary: builder.query({
      query: ({ video_id, platform }) => ({
        url: 'api/v1/get-transcript-v2',
        params: { video_id, platform },
      }),
    }),
  }),
});

export const { useLazyGetVideoSummaryQuery } = youtubeApi;
