import { apiSlice } from "../api/apiSlice";
import { ORDERS_URL } from "../constants";
const OrderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (formdata) => ({
        url: `${ORDERS_URL}/create_order`,
        credentials: "include",
        method: "POST",
        body: formdata,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/get-all-orders`,
        credentials: "include",
        method: "GET",
      }),
    }),
    getOrder: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/get-user-order`,
        credentials: "include",
        method: "GET",
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-orders`,
        credentials: "include",
        method: "GET",
      }),
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-sales`,
        credentials: "include",
        method: "GET",
      }),
    }),
    getTotalSalesByDate: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/total-sales-bydate`,
        credentials: "include",
        method: "GET",
      }),
    }),
    findOrderById: builder.mutation({
      query: (id) => ({
        url: `${ORDERS_URL}/find-order/${id}`,
        credentials: "include",
        method: "POST",
      }),
    }),
    updateOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/update-order/${id}`,
        credentials: "include",
        method: "GET",
      }),
    }),
    updateDeleveryOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/update-order-delevery/${id}`,
        credentials: "include",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  useFindOrderByIdMutation,
  useUpdateOrderQuery,
  useUpdateDeleveryOrderQuery,
} = OrderSlice;

export default OrderSlice;
