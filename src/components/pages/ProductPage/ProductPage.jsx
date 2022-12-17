import React, { useState,useEffect } from 'react'
import { Button, Col, Container, Form, Nav, Row, Card,Spinner,} from "react-bootstrap";
import 'boxicons';
import './ProductPage.css'
import instance from '../../../api/axios';
import  ModalCarrito  from "../Carrito/carrito.jsx"


const ProductPage = (props) => {
  props.funcNav(true)
  //usamos un useState , para definir las variables
  const [producto,setProductos]=useState([])
  const [buscadorProducto,setbuscadorProductos]=useState("")
  const [contador, setContador]= useState(0)
  // carrrito
  const [ productosCart, setProductosCart] = useState([])
  const [ productosParaCart, setProductosParaCart] = useState("")
  const [ precioCart, setPrecioCart] = useState("")
  const [ idCart, setidCart] = useState("")


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);  
 //creamos una constante para traer los productos instanciados de DB
  const getProductos= async()=>{
    try {
      //creamos una constante para poner la info de la base
      const resp= await instance.get("/products/")
      console.log(resp);
      //si la base tiene info seteamos producto para que traiga la info de la base
      setProductos(resp.data)
    } catch (error) {
      console.log(error);
      alert("Error")
      
    } 

  }
  const search = async ()=>{
    console.log(buscadorProducto);
    if (buscadorProducto ===""){
    getProductos()
    return      
  }
  try {
    const resp =await instance.get(`/productos/?name=${buscadorProducto}&detalle=${buscadorProducto}`)
    setProductos(resp.data)
  } catch (error) {
    console.log(error);
    
  }
  }
  const searchEnter = (e) => {
    // console.log(e)
   
    //  console.log(e.code)
    if(e.code === 'Enter'){
      search()
      e.preventDefault()
    }
  }
  const incrementarCarrito =()=>{
    setContador(contador+1);
  }
  //guardar en carrito
  const guardaCarrito =(e)=>{
    e.preventDefault()
    const miCarrito = {productosParaCart,precioCart,idCart}
    setProductosCart([...productosCart, miCarrito])

  }
  
    useEffect(()=>{
      getProductos()
      localStorage.setItem("productosCard",JSON.stringify(productosCart))
    },[])

  return (
    <>
      <Container className="py-5 ">
        <h3> Nuestras Birras</h3>
        <Nav className="justify-content-end mt-2" activeKey="/home">
          {/* carrito compra */}
          <Nav.Item>
            <Nav.Link>
              <div className="cart">
               <box-icon name="cart" onClick={handleShow}></box-icon>
                <span classname="item_carrito" onClick={handleShow}>{contador}</span>
              </div>
            </Nav.Link>
          </Nav.Item>
          {/* carrito compra */}
          <Nav.Item>
            {/* Buscador */}
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="🍻 Busca tu Birra 🍻 "
                className="me-2 m"
                onChange={(e) => setbuscadorProductos(e.target.value)}
                onKeyPress={searchEnter}
              />
              <Button variant="light" className="me-3" onClick={search}>
                🍺
              </Button>
            </Form>
            {/* buscador */}
          </Nav.Item>
        </Nav>
        {/* productos */}
        <Row>
          {producto.length > 0 ? (
            producto.map((prod) => (
              <Col xl={2} lg={4} md={6} key={prod._id}>
                <Card className="my-4">
                  <Card.Img
                    width={100}
                    height={200}
                    variant="top"
                    src={prod.ImgURL}
                  />
                  <Card.Body>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <Card.Title className="">{prod.ProductName}</Card.Title>
                      <span className="badge bg-yellow">{prod.Category}</span>
                    </div>
                    <Card.Text>{prod.Productdetalle}</Card.Text>
                    <Card.Text>
                      <p className="">Graduacion: {prod.Graduation}</p>
                    </Card.Text>
                    <Card.Text>
                      <h6 className="mb-0 ms-2 ">
                        Precio:${prod.PriceProduct}{" "}
                      </h6>
                    </Card.Text>
                    <div className="d-flex align-items-center justify-content-between">
                      <button  type="submit" className="btn-gray" onClick={incrementarCarrito}  onSubmit={guardaCarrito}> Agregar 🛒</button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Spinner color="warning" />
          )}
        </Row>
        {/* productos */}
      </Container>
      <ModalCarrito show={show} handleClose={handleClose}/>
    </>
  );
}

export default ProductPage