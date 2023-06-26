import {Banners as BannersImg} from "../../assents/images";
import Layout from "../Layout";
import "./index.css";

const Banner = ({
	text, 
	bg, 
	title="Вкусняшки для няшки!", 
	main=true
}) => {
	
	return <div className="banner">
		<Layout gap="small">
			{main 
				? <h1 className="banner__caption">{title}</h1> 
				: <h2 className="banner__caption">{title}</h2>}
			<div className="banner__text">{text}</div>
		</Layout>
	</div>
}

export default Banner;