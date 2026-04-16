import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    limitReached: false,
  },
  reducers: {
    addProduct: (state, action) => {
      if (state.items.length < 5) {
        state.items.push(action.payload);
        if (state.items.length === 5) {
          state.limitReached = true;
        }
      }
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.limitReached = false;
    },
    resetLimitReached: (state) => {
      state.limitReached = false;
    }
  },
});

export const { addProduct, removeProduct, resetLimitReached } = productSlice.actions;
export default productSlice.reducer;
