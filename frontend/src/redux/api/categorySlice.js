import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),

    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.id}`,
        credentials: "include",
        method: "PATCH",
      }),
    }),

    getallCategory: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        credentials: "include",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetallCategoryQuery,
} = categorySlice;
