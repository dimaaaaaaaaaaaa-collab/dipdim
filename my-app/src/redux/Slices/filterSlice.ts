import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortEnum {
	RATING_DESC = "rating",
	RATING_ASC = "-rating",
	TITLE_DESC = "title",
	TITLE_ASC = "-title",
	PRICE_DESC = "price",
	PRICE_ASC = "-price",
}

export interface SortType {
	name: string;
	sort: SortEnum;
}

export interface FilterSliceState {
	categoryId: number;
	searchValue: string;
	currentPage: number;
	sortType: SortType;
}

const initialState: FilterSliceState = {
	categoryId: 0,
	searchValue: "",
	currentPage: 1,
	sortType: {
		name: "популярности",
		sort: SortEnum.PRICE_DESC,
	},
};

const filterSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setSort(state, action: PayloadAction<SortType>) {
			state.sortType = action.payload;
		},
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.sortType = action.payload.sortType;
			state.currentPage = Number(action.payload.currentPage);
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const sortTypeSelector = (state: RootState) => state.filter.sortType;
export const filterSelector = (state: RootState) => state.filter;

export const productsSelector = (state: RootState) => state.products;

export const {
	setCategoryId,
	setSort,
	setCurrentPage,
	setFilters,
	setSearchValue,
} = filterSlice.actions;
export default filterSlice.reducer;
