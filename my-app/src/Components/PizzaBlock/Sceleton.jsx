import ContentLoader from "react-content-loader";

const Sceleton = props => (
	<ContentLoader
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="135" cy="126" r="125" />
		<rect x="0" y="264" rx="0" ry="0" width="280" height="27" />
		<rect x="0" y="323" rx="0" ry="0" width="280" height="88" />
		<rect x="11" y="449" rx="0" ry="0" width="85" height="27" />
		<rect x="116" y="437" rx="16" ry="16" width="152" height="45" />
	</ContentLoader>
);

export default Sceleton;
