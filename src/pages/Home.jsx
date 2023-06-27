import { Link } from "react-router-dom";
import { Image, Journals } from "react-bootstrap-icons";
import Layout from "../components/Layout";
import Banner from "../components/Banner";
import Slider from "../components/Slider";


import bannersData from "../assents/data/banners.json";

const Home = ({ user, setActive }) => {
	return <>
		<Layout mb={1} gap="none">
			{!user && <>
				<span className="info-link" onClick={() => setActive(true)}>Авторизуйтесь {}для входa</span></>}
			<div className="info bannerUp">
				<Banner {...bannersData[0]} />
				<div className="info-link">
					{user && <Link to="/catalog">
						<Journals style={{ marginRight: "10px" }} />
						Каталог
					</Link>}


				</div>
			</div>
		</Layout>
		<Layout mb={1} gap="small">
			<div className="ban" />
			<div className="ban2" />

		</Layout>
		<Layout mb={1} gap="small">
			<Slider desktop={4} mobile={2} />
		</Layout>

		<Layout mb={1} gap="none">
			<div className="post">
				<div className="post1" />
				<div className="post2" />
				<div className="post6" />

			</div>


		</Layout>
		<Layout mb={1} gap="small">
			<Slider desktop={4} mobile={2} />
		</Layout>

		<Layout mb={1} gap="none">
			<div className="post">
				<div className="post3" />
				<div className="post4" />
				<div className="post5" />

			</div>
		</Layout>
	</>
}

export default Home;