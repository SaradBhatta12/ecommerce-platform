import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categories: [],
  products: [],
  checked: [],
  radio: [],
  brandCheckBox: {},
  checkedBrands: [],
  fevProducts: [],
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setRadio: (state, action) => {
      state.radio = action.payload;
    },
    setBrandCheckBox: (state, action) => {
      state.brandCheckBox = action.payload;
    },
    setCheckedBrands: (state, action) => {
      state.checkedBrands = action.payload;
    },
    setfevProducts: (state, action) => {
      state.fevProducts.push(action.payload);
    },
    setRemovefevProduct: (state) => {
      state.fevProducts.filter((product) => product._id !== action.payload._id);
    },
  },
});

export const {
  setCategories,
  setProducts,
  setChecked,
  setRadio,
  setBrandCheckBox,
  setCheckedBrands,
  setfevProducts,
  setRemovefevProduct,
} = shopSlice.actions;

export default shopSlice.reducer;
