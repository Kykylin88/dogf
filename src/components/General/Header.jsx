import { useContext } from "react";
import {Link} from "react-router-dom";
import Logo from "./Logo"; 
import {
	BalloonHeartFill, 
	Basket2Fill, 
	PersonCircle, 
	BoxArrowInRight, 
//	BoxArrowLeft
} from "react-bootstrap-icons";
import Ctx from "../../Ctx";
import Basket from "../../pages/Basket";
import Search from "../Search";

const Header = ({
			user, 
			searchArr, 
			setGoods, 
			setModalOpen
	}) => {
	const {basket} = useContext(Ctx);
	const login = () => {
		setModalOpen(true)
	}
	// const logout = () => {
	// 	localStorage.removeItem("user12");
	// 	upd(null);
	// }
	return <header>
			<Logo/>
			<div className="search-block">
				<Search 
						data={searchArr} 
						setGoods={setGoods}
				/>
			</div>
			<nav className="header__menu">
				{user && <>
						<Link to="/favorites">
							<BalloonHeartFill title="Избранное"/>
						</Link>
						<Link to="/basket" className="header__link">
							<Basket2Fill title="Корзина"/>
							{basket.length > 0 && <span className="header__badge">
								{basket.reduce((acc, el) => acc + el.cnt, 0)}
								</span>}
						</Link>
						<Link to="/profile">
							<PersonCircle title="Личный кабинет"/>
						</Link>
				</>}
				<span>
					{!user && <BoxArrowInRight title="Войти" onClick={login}/>}
				</span>
			</nav>
	</header>
}

export default Header;

