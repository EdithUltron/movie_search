import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../constants/constant";

export const movieApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com/",
  }),
  tagTypes:['movies'],
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (name) => ({
        url: "/",
        params: { apikey: API_KEY,t:name},
      }),
      providesTags:['movies']
    }),

  }),
});

export const {useLazyGetMovieQuery} = movieApi