import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async function to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products?limit=152');
  const data = await response.json();
  return data.products; // Return the list of products
});

const ProductsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Products
    status: 'idle', // Request status (idle, loading, succeeded, failed)
    error: null, // Error message if any issue occurs
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // If products are fetched successfully
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Add the fetched products to the state
      })
      // If fetching products failed
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Store the error message
      });
  },
});

export default ProductsSlice.reducer; // Export the products reducer
