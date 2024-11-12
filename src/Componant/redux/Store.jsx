import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../redux/ProductsSlice";
import CartSlice from './CardSlice'
const Store = configureStore({
  reducer: {
    products: ProductsSlice,
    cart: CartSlice,
  },
});

export default Store;
