import {useState, useContext, useEffect} from "react";
import {Row, Col, Carousel, Container} from "react-bootstrap";
import BsCard from "../BsCard";
import Ctx from "../../Ctx";

import "./style.css";

const Slider = ({desktop = 4, mobile = 1}) => {

    const {baseData} = useContext(Ctx);
    const [gds, setGds] = useState([[]]);
    const [cnt, setCnt] = useState(desktop);

    useEffect(()=> {
        if (window.innerWidth <= 768) {
            setCnt(mobile)
        }
        window.addEventListener("resize", function() {
            if (window.innerWidth <= 768) {
                setCnt(mobile)
            } else {
                setCnt(desktop)
            }
        })
    }, [])

    useEffect(() => {
        console.log(baseData)
        if (baseData.length) {
          
            setGds(baseData.reduce((acc, el, i) => {
                if (i % cnt === 0) {
                    acc.push([]);
                }
                acc[acc.length - 1].push(el)
                return acc;
            }, []))

        }
    }, [baseData, cnt])

    useEffect(() => {
        console.log(gds)
    }, [gds])

    return <Container style={{gridTemplateColumns: "1fr"}}>
        <Col className="hit" xs={12} md={12}>Хиты продаж</Col>
       
       
        <Carousel controls={false} interval={3000} indicators={false}>
            {gds.map((el, i) => <Carousel.Item key={i}>
                <Row>
                    {el.map(card => <Col xs={12 / cnt} key={card._id}>
                        <BsCard {...card} />
                    </Col>)}
                   
                </Row>
            </Carousel.Item>)}
        </Carousel>
        <Col className="hit2" xs={12} md={12}>Лучшее предложение</Col>
       
       
       <Carousel controls={false} interval={35000} indicators={false}>
           {gds.map((el, i) => <Carousel.Item key={i}>
               <Row>
                   {el.map(card => <Col xs={12 / cnt} key={card._id}>
                       <BsCard {...card} />
                   </Col>)}
                  
               </Row>
           </Carousel.Item>)}
       </Carousel>
    </Container>
    
   }
  
   


export default Slider;