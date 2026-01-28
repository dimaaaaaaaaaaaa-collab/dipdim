import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type SearchProductParams = {
	sortBy: string;
	order: string;
	category: string;
	search: string;
	currentPage: string;
};

export const fetchProductsSL = createAsyncThunk<Product[], SearchProductParams>(
	"product/fetchProducts",
	async params => {
		const { sortBy, order, category, search, currentPage } = params;
		const { data } = await axios.get<Product[]>(
			`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		);
		return data;
	}
);
export type Product = {
	id: string;
	title: string;
	price: number;
	count: number;
	imageUrl: string;
	category: number;
	rating: number;
};

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

interface ProductSliceState {
	items: Product[];
	status: Status;
}

const initialState: ProductSliceState = {
	items: [],
	status: Status.LOADING,
};

const productSlice = createSlice({
	name: "product",
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchProductsSL.pending, state => {
				state.status = Status.LOADING;
				state.items = [];
			})
			.addCase(fetchProductsSL.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = Status.SUCCESS;
			})
			.addCase(fetchProductsSL.rejected, state => {
				state.status = Status.ERROR;
				state.items = [];
			});
	},
});

export const { setItems } = productSlice.actions;
export default productSlice.reducer;
