import { configureStore, createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: { items: [] },
    reducers: {
    addToCart: (state, action) => {
        const itemExists = state.items.find(item => item._id === action.payload._id);
        if (itemExists) {
        itemExists.qty += 1; // increase quantity if already exists
        } else {
        state.items.push({ ...action.payload, qty: 1 });
        }
    },
    removeFromCart: (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
    },
    clearCart: (state) => {
        state.items = [];
    }
    }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

const store = configureStore({
    reducer: {
    cart: cartSlice.reducer,
    },
});

export default store;
