import {Link} from "react-router-dom";
import logoImg from "../../assents/images/logo.png";

const Logo = () => <Link className="logo" to="/">
	<img src={logoImg} alt="DogFood"/>
	<span className="logo__text">Довольный пёс</span>
	</Link>

	export default Logo;