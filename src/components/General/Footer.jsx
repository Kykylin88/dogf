import {Link} from "react-router-dom";
import Logo from "./Logo"; 
const Links = [
	//{name: "Каталог", src: "/catalog"},
	/*{name: "Избранное", src: "/"},*/
	//{name: "Корзина", src: "/"},
	{name: "Тестовая страница", src: "/old"}
]

const Footer = () => <footer>
	<div className="footer__copy">
	
	<span>©{new Date().getFullYear()}</span>
	
	</div>
	<div>
+7 (846) 123-45-67<br/>

   dogfood@gmail.com</div>
	<ul className="footer__nav">
			{Links.map(el => <li key={el.name}>
				<Link to={el.src}>{el.name}</Link>
			</li>)}
	</ul>
</footer>

export default Footer;

