import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    visibility: JSON.parse(localStorage.getItem("visibility")) || [],
    selectedCategory: null,
  },
  reducers: {
    addItem: (state, action) => {
      const { product, quantity } = action.payload;
      if (quantity > 0) {
        const existingProduct = state.items.find((item) => item.id === product.id);

        if (existingProduct) {
          existingProduct.quantity = quantity; // Update quantity
        } else {
          state.items.push({ ...product, quantity }); // Add new item
        }

        localStorage.setItem("cart", JSON.stringify(state.items)); // Update localStorage
      }
    },

    removeItem: (state, action) => {
      const index = state.items.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1); // Remove item
        localStorage.setItem("cart", JSON.stringify(state.items)); // Update localStorage
      }
    },
    updateItemQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity; // Update quantity
        localStorage.setItem("cart", JSON.stringify(state.items)); // Update localStorage
      }
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(action.payload)); // Update localStorage
    },
    toggleFavorite: (state, action) => {
      const existingFavorite = state.favorites.find((item) => item.id === action.payload.id);
      if (existingFavorite) {
        state.favorites = state.favorites.filter((item) => item.id !== action.payload.id); // Remove from favorites
      } else {
        state.favorites.push(action.payload); // Add to favorites
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Update localStorage
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((item) => item.id !== action.payload.id); // Remove from favorites
      localStorage.setItem("favorites", JSON.stringify(state.favorites)); // Update localStorage
    },
    toggleVisibility: (state, action) => {
      const existingVisibility = state.visibility.find((item) => item.id === action.payload.id);
      if (!existingVisibility) {
        state.visibility.push(action.payload); // Add to visibility
        localStorage.setItem("visibility", JSON.stringify(state.visibility)); // Update localStorage
      }
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload; 
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  setCartItems,
  toggleFavorite,
  removeFavorite,
  toggleVisibility,
  setCategory,
} = CartSlice.actions;

export default CartSlice.reducer;
