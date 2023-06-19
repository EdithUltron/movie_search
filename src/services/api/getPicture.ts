import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../constants/constant";

export const picApi = createApi({
  reducerPath: "picApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://img.omdbapi.com/",
    
  }),
  tagTypes:['pics'],
  endpoints: (builder) => ({
    getPic: builder.query({
      query: (id) => ({
        url: "/",
        params: { apikey: API_KEY, i: "tt8784956" },
        responseHandler(response) {
          return response.blob();
        },
      }),
      
      // transformResponse: (response: { blob: () => {} }) => {
      //   console.log(response);
      //   return [{id:API_KEY,data: response.blob() }];
      // },
      providesTags:['pics']
    }),
  }),
});

export const {useLazyGetPicQuery} = picApi