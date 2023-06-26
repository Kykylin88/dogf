import {useState, useEffect, createContext} from "react";
import {Routes, Route} from "react-router-dom";
import Ctx from "./Ctx";
import Api from "./Api";
//import testData from "./assents/data.json";
import Modal from "./components/Modal";
import {Header, Footer} from "./components/General";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import OldPage from "./pages/Old";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import Favorites from "./pages/Favorites";
import Layout from "./components/Layout";
import Basket from "./pages/Basket";

const App = () => {
	// const user = localStorage.getItem("user12");
	let basketStore = localStorage.getItem("basket12");
	if (basketStore && basketStore[0] === "[") {
		basketStore = JSON.parse(basketStore);
	} else {
		basketStore = [];
	}
	const [user, setUser] = useState(localStorage.getItem("user12"));
	const [userId, setUserId] = useState(localStorage.getItem("user12-id"));
	const [token, setToken] = useState(localStorage.getItem("token12"));
	const [api, setApi] = useState(new Api(token));
	const [baseData, setBaseData] = useState([]);
	const [goods, setGoods] = useState(baseData);
	const [searchResult, setSearchResult] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [basket, setBasket] = useState(basketStore);

	useEffect(() => {
		if (user) {
			setUserId(localStorage.getItem("user12-id"));
			setToken(localStorage.getItem("token12"));
		} else {
			localStorage.removeItem("user12-id")
			localStorage.removeItem("token12")
			setUserId(null);
			setToken(null);
		}
	}, [user])

	useEffect(() => {
		localStorage.setItem("basket12", JSON.stringify(basket));
	}, [basket])

	useEffect(() => {
		setApi(new Api(token));
		// console.log("token", token);
		// if (token) {
		// 	fetch("https://api.react-learning.ru/products", {
		// 		headers: {
		// 			"Authorization": `Bearer ${token}`
		// 		}
		// 	})
		// 	.then (res => res.json())
		// 	.then (data => setBaseData(data.products));
		// }
	}, [token])

useEffect(() => {
	if (token) {
		api.getProducts()
		.then(data => {
			setBaseData(data.products);
		})
	} else {
		setBaseData([]);
	}
}, [api])

useEffect(() => {
	//setGoods(baseData)
}, [baseData])

	return (
<Ctx.Provider value={{
		searchResult,
		setSearchResult,
		setBaseData,
		baseData,
		goods,
		setGoods,
		userId,
		token,
		api,
		basket,
		setBasket
}}>
	<Header 
			user={user} 
			upd={setUser} 
			searchArr={baseData} 
			setGoods={setGoods} 
			setModalOpen={setModalOpen}
	/>
	<main>
		<Layout>
		<Routes>
				<Route path="/" element={<Home user={user} setActive={setModalOpen}/>}/>
				<Route path="/catalog" element={<Catalog 
					goods={goods}
					userId={userId}
				/>
				}/>
				<Route path="/old" element={
						<OldPage 
								goods={goods}
						/>
					}/>
				<Route path="/profile" element={
                   <Profile user={user} setUser={setUser}/>}
               />

				<Route path="/product/:id" element={<Product/>}/>
				<Route path="/add/product" element={<AddProduct/>}/>
				<Route path="/basket" element={<Basket/>}/>
				<Route path="/favorites" element={<Favorites/>}/>
		</Routes>
		</Layout>	
	</main>
			<Footer/>
			
			<Modal 
					isActive={modalOpen} 
					setIsActive={setModalOpen}
					setUser={setUser}
			/>
</Ctx.Provider>
  )
}

export default App;