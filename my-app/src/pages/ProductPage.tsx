import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchProduct() {
			try {
				const { data } = await axios.get(
					`https://685452cb6a6ef0ed662ec830.mockapi.io/pizzas/${id}`
				);
				setProduct(data);
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
					navigate("/");
				} else {
					return "ошибочка";
				}
			}
		}
		fetchProduct();
	}, [id, navigate]);

	if (!product) {
		return <h2>Загрузка товара...</h2>;
	}

	return (
		<div className="container">
			<img src={product.imageUrl} alt={product.title} />
			<h1>{product.title}</h1>
			<h2>Стоимость: {product.price.toLocaleString('ru-RU')} ₽</h2>
		</div>
	);
};

export default ProductPage;
