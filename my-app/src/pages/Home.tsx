import qs from "qs";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Categories from "../Components/Categories";
import Pagination from "../Components/Pagination";
import ProductBlock from "../Components/PizzaBlock";
import Sceleton from "../Components/PizzaBlock/Sceleton";
import Sort, { popupItems } from "../Components/Sort";
import {
	filterSelector,
	productsSelector,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from "../redux/Slices/filterSlice";
import { fetchProductsSL } from "../redux/Slices/productsSlice";
import { useAppDispatch } from "../redux/store";
import "../scss/app.scss";

const Home = () => {
	const navigate = useNavigate();
	const { categoryId, sortType, currentPage, searchValue } =
		useSelector(filterSelector);

	const isSearch = useRef(false);

	const dispatch = useAppDispatch();
	const isMounted = useRef(false);

	const setCategoriesActiveIndex = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const { items, status } = useSelector(productsSelector);

	const onChangePage = (num: number) => {
		dispatch(setCurrentPage(num));
	};
	async function fetchProducts() {
		const sortBy = sortType.sort.replace("-", "");
		const order = sortType.sort.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const search = searchValue ? `&search=${searchValue}` : "";

		try {
			dispatch(
				fetchProductsSL({
					sortBy,
					order,
					category,
					search,
					currentPage: String(currentPage),
				})
			);
		} catch (err) {
			if (err instanceof Error) {
				alert(err.message);
			}
		}
	}

	//Если изменили параметры и был первый рендер
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sortType.sort,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sortType, searchValue, currentPage]);

	//Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as {
				sortProperty: string;
				categoryId: string;
				currentPage: string;
				search?: string;
			};

			const sort =
				popupItems.find(obj => obj.sort === params.sortProperty) ??
				popupItems[0];

			dispatch(
				setFilters({
					searchValue: params.search || "",
					categoryId: Number(params.categoryId),
					currentPage: Number(params.currentPage),
					sortType: sort,
				})
			);
			isSearch.current = true;
		}
	}, []);
	//Если был первый рендер, то запрашиваем товары
	useEffect(() => {
		window.scrollTo(0, 0);
		if (!isSearch.current) {
			fetchProducts();
		}
		isSearch.current = false;
	}, [categoryId, sortType, searchValue, currentPage]);

	const products = items.map(i => <ProductBlock key={i.id} {...i} />);

	const skeletons = [...new Array(6)].map((_, index) => (
		<Sceleton key={index} />
	));

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} setValue={setCategoriesActiveIndex} />
				<Sort />
			</div>
			<h2 className="content__title">Вся техника</h2>
			{status === "error" ? (
				<div className="content__error-info">
					<h1>Ошибка загрузки товаров 😕</h1>
					<p>
						К сожалению, не удалось загрузить товары. Пожалуйста, попробуйте обновить страницу.
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? skeletons : products}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
