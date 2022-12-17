import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Table } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

const ModalCarrito = ({ show, handleClose }) => {
  const myuuid = uuidv4();
  const hoy = moment();
  moment.locale("es");
  const [cart, setCart] = useState([]);
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    return () => {
      setCart([]);
    };
  }, [show]);
  const deleteProduct=(uuid)=>{
  const newArr=cart.filter(prod=>prod.uuid!==uuid);
  console.log(newArr);
  setCart(newArr);
  console.log(cart);
  localStorage.setItem('cart',JSON.stringify(newArr));
  }
  let total=0;
  for (let index = 0; index < cart.length; index++) {
    total=total + parseFloat(cart[index].PriceProduct)
  }
  
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title> 🛒 Su carrito: </Modal.Title>
      </Modal.Header>
      <h6 className="align-middle text-center mt-3">{hoy.format("llll")}</h6>
      <Modal.Body>
        <Table
          bordered
          hover
          responsive
          className="align-middle text-center mt-3"
        >
          <thead>
            <tr>
              <th>N.</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cant.</th>
              <th>Total</th>
              <th>Quitar</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((prod, index) => {
              return (
                <tr key={prod.uuid}>
                  <td>{index+1}</td>
                  <td>{prod.ProductName}</td>
                  <td>{`$ ${prod.PriceProduct}`}</td>
                  <td>1</td>
                  <td>{`$ ${prod.PriceProduct}`}</td>
                  <td className="w-25">
                    <div className="d-flex justify-content-center">
                      <Button variant="outline-danger mx-1" onClick={()=>{
                        deleteProduct(prod.uuid);
                      }}>
                        <box-icon
                          name="message-square-x"
                          type="solid"
                        ></box-icon>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {/* <tr>
              <td>1</td>
              <td>IPA LOCA</td>
              <td>$400</td>
              <td>2</td>
              <td>$800</td>
              <td className="w-25">
                <div className="d-flex justify-content-center">
                  <Button variant="outline-danger mx-1">
                    <box-icon name="message-square-x" type="solid"></box-icon>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>IPA LOCA</td>
              <td>$400</td>
              <td>2</td>
              <td>$800</td>
              <td className="w-25">
                <div className="d-flex justify-content-center">
                  <Button variant="outline-danger mx-1">
                    <box-icon name="message-square-x" type="solid"></box-icon>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>IPA LOCA</td>
              <td>$400</td>
              <td>2</td>
              <td>$800</td>
              <td className="w-25">
                <div className="d-flex justify-content-center">
                  <Button variant="outline-danger mx-1">
                    <box-icon name="message-square-x" type="solid"></box-icon>
                  </Button>
                </div>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>IPA LOCA</td>
              <td>$400</td>
              <td>2</td>
              <td>$800</td>
              <td className="w-25">
                <div className="d-flex justify-content-center">
                  <Button variant="outline-danger mx-1">
                    <box-icon name="message-square-x" type="solid"></box-icon>
                  </Button>
                </div>
              </td>
            </tr> */}
          </tbody>
        </Table>
      </Modal.Body>
      <h4 className="text-center">{`$ ${total}`}</h4>
      <Modal.Footer className="text-center">
        <div className="text-center">Ticket Op: {myuuid} </div>
        <Button variant="secondary" onClick={handleClose}>
          Vaciar carrito
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Comprar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalCarrito;
