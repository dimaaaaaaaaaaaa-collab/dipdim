import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cart from "./Slices/cartSlice";
import filter from "./Slices/filterSlice";
import products from "./Slices/productsSlice";

export const store = configureStore({
	reducer: {
		filter,
		cart,
		products,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
