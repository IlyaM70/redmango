import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi12.azurewebsites.net/api/",
  }),

  endpoints: (builder) => ({
    initialPayment: builder.mutation({
      query: (userId) => ({
        url: "payment",
        method: "POST",
        body: { userId },
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
export default paymentApi;
