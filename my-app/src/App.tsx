import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header";

import Home from "./pages/Home";

import React, { Suspense } from "react";
import "./scss/app.scss";

const Cart = React.lazy(
	() => import(/*webpackChunkName: "Cart" */ "./pages/Cart")
);

const NotFound = React.lazy(
	() => import(/*webpackChunkName: "NotFound" */ "./pages/NotFound")
);

const ProductPage = React.lazy(
	() => import(/*webpackChunkName: "ProductPage" */ "./pages/ProductPage")
);

function App() {
	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<Routes>
					<Route path="/" element={<Home />} />

					<Route
						path="/cart"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								{" "}
								<Cart />{" "}
							</Suspense>
						}
					/>

					<Route
						path="/product/:id"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								{" "}
								<ProductPage />{" "}
							</Suspense>
						}
					/>

					<Route
						path="*"
						element={
							<Suspense fallback={<div>Loading...</div>}>
								<NotFound />
							</Suspense>
						}
					/>
				</Routes>
			</div>
		</div>
	);
}

export default App;
