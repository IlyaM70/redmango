import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redmangoapi12.azurewebsites.net/api/",
    prepareHeaders: (headers: Headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.append("Authorization", `Bearer ${token}`);
      }
    },
  }),
  tagTypes: ["Orders"],

  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "order",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query({
      query: ({ userId, searchString, status, pageNumber, pageSize }) => ({
        url: "order",
        params: {
          ...(userId && { userId }),
          ...(searchString && { searchString }),
          ...(status && { status }),
          ...(pageNumber && { pageNumber }),
          ...(pageSize && { pageSize }),
        },
      }),
      transformResponse: (apiResponse: { result: any }, meta: any) => {
        return {
          apiResponse,
          totalRecords: meta.response.headers.get("X-Pagination"),
        };
      },
      providesTags: ["Orders"],
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["Orders"],
    }),
    updateOrderHeader: builder.mutation({
      query: (orderDetails) => ({
        url: `order/${orderDetails.orderHeaderId}`,
        method: "PUT",
        body: orderDetails,
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderHeaderMutation,
} = orderApi;
export default orderApi;
