import { CartItem } from "../redux/Slices/cartSlice";

export const calcTotalPrice = (item: CartItem[]) => {
	return item.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
