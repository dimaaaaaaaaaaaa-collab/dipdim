import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./pagination.module.scss";

type PaginationProps = {
	currentPage: number;
	onChangePage: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	onChangePage,
}) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			onPageChange={event => {
				const selectedPage = event.selected + 1;
				if (selectedPage !== currentPage) {
					onChangePage(selectedPage); // ✅ только если новое значение
				}
			}}
			pageRangeDisplayed={4}
			pageCount={3}
			forcePage={currentPage - 1}
			previousLabel="<"
			renderOnZeroPageCount={null}
		/>
	);
};

export default Pagination;
