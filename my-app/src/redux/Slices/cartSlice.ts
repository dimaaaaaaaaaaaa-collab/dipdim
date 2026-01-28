import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { RootState } from "../store";

export type CartItem = {
	id: string;
	title: string;
	price: number;
	count: number;
	imageUrl: string;
};

interface CartSliceState {
	totalPrice: number;
	item: CartItem[];
}
const cartData = getCartFromLS();
const initialState: CartSliceState = {
	totalPrice: cartData.totalPrice,
	item: cartData.items,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItem>) {
			const findItem = state.item.find(obj => obj.id === action.payload.id);

			if (findItem) {
				findItem.count++;
			} else {
				state.item.push({
					...action.payload,
					count: 1,
				});
			}
			state.totalPrice = calcTotalPrice(state.item);
		},
		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.item.find(obj => obj.id === action.payload);
			if (findItem) {
				findItem.count--;
			}
			state.totalPrice = state.item.reduce((sum, obj) => {
				return obj.price * obj.count + sum;
			}, 0);
		},
		removeItem(state, action: PayloadAction<string>) {
			state.item = state.item.filter(obj => obj.id !== action.payload);
			state.totalPrice = state.item.reduce(
				(sum, obj) => obj.price * obj.count + sum,
				0
			);
		},
		clearItems(state) {
			state.item = [];
			state.totalPrice = 0;
		},
	},
});

export const cartSelection = (state: RootState) => state.cart;
export const cartIdSelector = (id: string) => (state: RootState) =>
	state.cart.item.find(obj => obj.id === id);
export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
