import {Link} from "react-router-dom";
import Logo from "./Logo"; 
const Links = [
	{name: "Каталог", src: "/catalog"},
	/*{name: "Избранное", src: "/"},*/
	{name: "Корзина", src: "/"},
	{name: "Тестовая страница", src: "/old"}
]

const Footer = () => <footer>
	<div className="footer__copy">
	<Logo/>
	<span>©{new Date().getFullYear()}</span>
	
	</div>
	
	<ul className="footer__nav">
			{Links.map(el => <li key={el.name}>
				<Link to={el.src}>{el.name}</Link>
			</li>)}
	</ul>
</footer>

export default Footer;

