import { useContext, useEffect } from "react";
import {Container, Row, Col} from "react-bootstrap";
import BsCard from "../components/BsCard";
import Ctx from "../Ctx";
import usePagination from "../hooks/usePagination";
import Pagination from "../components/Pagination";

const Catalog = ({goods, userId}) => {
	const {searchResult} = useContext(Ctx);
	const paginate = usePagination(goods, 9);

	useEffect(() => {
		paginate.step(1);
	 }, [searchResult])	

	return <Container className="d-block">
		<Row className="g-3">
				{searchResult &&	<Col xs={12} className="search-result">
					 {searchResult}
				</Col>}
				<Col xs={12}>
						<h1 style={{margin: 0, gridColumnEnd: "span 3"}}>Каталог товаров</h1>
				</Col>

				{paginate.pageData().map((pro, i) => (
				<Col key={i} xs={12} sm={6} md={4} lg={3}>
						<BsCard img={pro.pictures} {...pro} user={userId}/>
				</Col>
				))}
				
				{paginate.pageData().length > 0 && <Col xs={12} className="text-center d-flex justify-content-center flex-column align-items-center overflow-hidden"><Pagination hk={paginate} /></Col>}
		</Row>
</Container>
}

export default Catalog;