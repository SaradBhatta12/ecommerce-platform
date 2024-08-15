import { filterProducts } from "../../../../backend/controllers/products.controllers";
import { apiSlice } from "../api/apiSlice";
export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/products",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({
        id,
        name,
        image,
        brand,
        quantity,
        category,
        price,
        description,
      }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: {
          name,
          image,
          brand,
          quantity,
          category,
          price,
          description,
        },
        credentials: "include",
      }),
    }),
    getallProduct: builder.query({
      query: () => ({
        url: "/products",
        credentials: "include",
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        credentials: "include",
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: "/products/top-products",
        method: "GET",
        credentials: "include",
      }),
    }),
    getTrendingProducts: builder.query({
      query: () => ({
        url: "/products/trending",
        method: "GET",
        credentials: "include",
      }),
    }),
    addReview: builder.mutation({
      query: ({ id, rating, comment }) => ({
        url: `/products/add-review/:${id}`,
        method: "POST",
        body: { rating, comment },
        credentials: "include",
      }),
    }),
    filterProducts: builder.mutation({
      query: ({ checked, radio }) => ({
        url: "/products/filter",
        method: "POST",
        body: { checked, radio },
        credentials: "include",
      }),
    }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/uploads/",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetallProductQuery,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useGetTopProductsQuery,
  useGetTrendingProductsQuery,
  useAddReviewMutation,
  useFilterProductsMutation,
  useUploadImageMutation,
} = productSlice;
