
import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Basket2, Plus, Trash3, TruckFlatbed } from "react-bootstrap-icons"
import { Container, Row, Col, Table, Card, Button, Form, ButtonGroup } from "react-bootstrap";
import Ctx from "../Ctx";

const Product = () => {
	const { id } = useParams();
	const { api, userId, setBaseData, basket, setBasket } = useContext(Ctx);
	const [data, setData] = useState({});
	const [revText, setRevText] = useState("");
	const [revRating, setRevRating] = useState(0);
	const [hideForm, setHideForm] = useState(true);
	const navigate = useNavigate();
	const tableInfo = [
		{
			name: "wight",
			text: "Вес"
		},
		{
			name: "author",
			text: "Продавец"
		},
		{
			name: "description",
			text: "Описание товара"
		}
	]

	const addReview = (e) => {
		e.preventDefault();
		api.setReview(data._id, {
			text: revText,
			rating: revRating
		}).then(d => {
			setData(d);
			setRevText("");
			setRevRating(0);
			setHideForm(true);
		})
	};

	const delReview = (id) => {
		api.delReview(data._id, id).then(d => {
			setData(d);
		})
	};

	useEffect(() => {
		api.getSingleProduct(id)
			.then(serverData => {
				setData(serverData);
			})
	}, [api, id]);

	const delHandler = () => {
		api.delSingleProduct(id)
			.then(data => {
				setBaseData(prev => prev.filter(el => el._id !== id));
				navigate("/catalog");
			})
	}

	// В корзину
	const [cnt, setCnt] = useState(0);
	const inBasket = basket.filter(el => el.id === id).length > 0;
	const addToBasket = !inBasket
		? (e) => {
			e.preventDefault()
			e.stopPropagation()
			cnt > 1 ? setCnt(0) : setCnt(1)
			setBasket(prev => [...prev, {
				id,
				price: data.price,
				discount: data.discount,
				cnt: 1
			}])
		}
		: (() => { });

	// Количество товаров в корзине на странице товара
	const inc = (id) => {
		setBasket(prev => prev.map(el => {
			if (el.id === id) {
				el.cnt++
			}
			return el;
		}))
	}
	const dec = (id) => {
		setBasket(prev => prev.map(el => {
			if (el.id === id) {
				el.cnt--
			}
			return el;
		}))
	}
	const del = (id) => {
		setBasket(prev => prev.filter(el => el.id !== id))
	}


	return <Container style={{ gridTemplateColumns: "1fr" }}>
		<Row className="g-3">
			<Link to={`/catalog#pro_${id}`}>Назад</Link>
			{data.name
				? <>
					<Col xs={12}>
						<h1>{data.name}</h1>
					</Col>
					<Col xs={12} sm={6} md={4} className="d-relative p-4">
						{data.discount !== 0 && <>
							<div className="
									ps-2
									pe-2
									m-2
									position-absolute
									rounded-pill
									sale
									bg-danger
									text-white
									border-none
								"
							>
								Sale {data.discount}%
							</div>
						</>}
						<img src={data.pictures} alt={data.name} className="w-100" />
					</Col>
					<Col>
						<Row className="mb-2">
							<Col
								xs={12}
								className={`${data.discount !== 0
									? "text-secondary fs-5 text-decoration-line-through"
									: "text-dark fw-bold fs-1"}`}
							>
								{data.price} ₽
							</Col>
							{data.discount !== 0 && <>
								<Col xs={12}
									className={`${data.discount
										? "text-danger"
										: "text-secondary"} fw-bold fs-1`}
								>
									{Math.ceil(data.price * (100 - data.discount) / 100)} ₽
								</Col>
							</>}
						</Row>
						<Row >
							{basket.map((el) => el.id === id &&
								<Col xs={4} sm={4} lg={3} className="d-flex align-items-center">
									<ButtonGroup>
										<Button
											variant="warning"
											disabled={el.cnt === 1}
											onClick={() => dec(el.id)}
										>-</Button>
										<Button variant="light" disabled>{el.cnt}</Button>
										<Button variant="warning" onClick={() => inc(el.id)}>+</Button>
									</ButtonGroup>
									<Trash3 onClick={() => del(el.id)} style={{ cursor: "pointer", margin: "20px"}} />
								</Col>
							)}
							<Col xs={4} sm={4} lg={3} className="d-flex align-items-center">
								<Button
									onClick={addToBasket}
									variant="warning"
									disabled={inBasket}
								>
									{!inBasket
										? "Добавить в корзину"
										:  <> "В корзине"<Link to={`/src/pages/Basket.jsx`} className="card-link"></Link>
										</>
									}
								</Button>
							</Col>
						</Row>
						<Row className="mt-4">
							<Col >
								<Card className="mb-4 p-3 d-flex flex-row rounded-4">
									<Card.Body>
										<TruckFlatbed className="d-flex justify-content-center align-items-center fs-2" />
									</Card.Body>
									<Card.Body className="w-100">
										<Card.Title className="mb-3">
											Доставка по России и миру!
										</Card.Title>
										<Card.Subtitle className="text-muted" style={{ lineHeight: "1.5" }}>
											Если Вам не понравилось качество нашей продукции, мы вернем деньги,
											либо сделаем все возможное, чтобы удовлетворить ваши нужды.
										</Card.Subtitle>
									</Card.Body>
								</Card>
							</Col>
						</Row>
					</Col>
					<Col xs={12}>
						<Table>
							<tbody>
								{tableInfo.map((el, i) => <tr key={i}>
									<th className="fw-normal text-secondary small w-25" >{el.text}</th>
									<td>{el.name === "author"
										? <>
											<span className="me-3">Имя: {data[el.name].name}</span>
											<span>Адрес: {data[el.name].email}</span>
										</>
										: data[el.name]
									}</td>
								</tr>)}
							</tbody>
						</Table>
					</Col>
					{data.author._id === userId && <Button variant="warning" as={Link} to={`/upd/product/${id}`}>Изменить товар</Button>}
					{data.author._id === userId && <Button variant="warning" onClick={delHandler}>Удалить товар</Button>}
					{data.reviews.length > 0 ? <Col xs={12}>
						<h2>Отзывы</h2>
						<Row className="g-3">
							{data.reviews.map(el => <Col xs={12} sm={6} md={4} key={el._id}>
								<Card className="h-100">
									<Card.Body>
										<span className="d-flex w-100 align-items-center mb-2">
											<span style={{
												width: "30px",
												height: "30px",
												display: "block",
												backgroundPosition: "center",
												backgroundRepeat: "no-repeat",
												backgroundSize: "cover",
												backgroundImage: `url(${el.author.avatar})`,
												marginRight: "1rem",
												borderRadius: "50%"
											}} />
											<span>
												{el.author.name}
											</span>
										</span>
										<Card.Title>{el.rating}</Card.Title>
										<Card.Text className="fs-6 text-secondary">{el.text}</Card.Text>
										{el.author._id === userId && <span className="text-danger position-absolute end-0 bottom-0 pe-3 pb-2">
											<Basket2 onClick={() => delReview(el._id)} />
										</span>}
									</Card.Body>
								</Card>
							</Col>
							)}
							{hideForm && <Col>
								<Button
									variant="warning"
									className="fs-1 w-100 h-100"
									onClick={() => setHideForm(false)}
								>
									Добавить новый отзыв
								</Button>
							</Col>}
						</Row>
					</Col>
						: hideForm && <Col><Button variant="warning" onClick={() => setHideForm(false)}>Написать отзыв</Button></Col>
					}
					{!hideForm && <Col xs={12} className="mt-5">
						<h3>Новый отзыв</h3>
						<Form onSubmit={addReview}>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="rating">Рейтинг (0-5)</Form.Label>
								<Form.Control
									type="number"
									min={1}
									max={5}
									step={1}
									id="rating"
									value={revRating}
									onChange={(e) => setRevRating(+e.target.value)}
								/>
							</Form.Group>
							<Form.Group className="mb-3">
								<Form.Label htmlFor="text">Комментарий:</Form.Label>
								<Form.Control
									as="textarea"
									type="text"
									id="text"
									value={revText}
									rows={3}
									onChange={(e) => setRevText(e.target.value)}
								/>
							</Form.Group>
							<Button
								type="warning"
								className="me-2"
								onClick={(e) => {
									e.preventDefault();
									setRevText("");
									setRevRating(0);
									setHideForm(true);
								}}
							>Отмена</Button>
							<Button type="warning">Добавить</Button>
						</Form>
					</Col>}
				</>
				: <Col xs={12}>
					<div className="info" style={{ textAlign: "center" }}>
						Товара {id} не существует<br />или<br />он еще не загружен
					</div>
				</Col>
			}
		</Row>
	</Container>
}

export default Product;