import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recommendationApi = createApi({
  reducerPath: 'recommendationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:12046/api/', // Replace with your actual .NET backend URL
  }),
  endpoints: (builder) => ({
    getRecommendations: builder.query<any, string>({
      query: (userId) => `recommendations/${userId}`,
    }),
  }),
});

export const { useGetRecommendationsQuery } = recommendationApi;