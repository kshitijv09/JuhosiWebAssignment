import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import GetOrder from "../GetOrder/GetOrder";

const Order = () => {
  const email = localStorage.getItem("email");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const orderDate = useRef();
  const company = useRef();
  const owner = useRef();
  const item = useRef();
  const quantity = useRef();
  const weight = useRef();
  const shipmentRequest = useRef();
  const trackingId = useRef();
  const shipmentSize = useRef();
  const boxCount = useRef();
  const specification = useRef();
  const checklistQuantity = useRef();
  //const orderDate=useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: email.substring(0, email.indexOf("@")),
      orderDate: orderDate.current.value,
      company: company.current.value,
      owner: owner.current.value,
      item: item.current.value,
      quantity: quantity.current.value,
      weight: weight.current.value,
      shipmentRequest: shipmentRequest.current.value,
      trackingId: trackingId.current.value,
      shipmentSize: shipmentSize.current.value,
      boxCount: boxCount.current.value,
      specification: specification.current.value,
      checklistQuantity: checklistQuantity.current.value,
    };

    try {
      console.log("User data is", userData);
      await axios.post("http://localhost:5000/user/add_order", userData, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e.response);
    }
  };

  const checkAdminHandler = () => {
    setLoggedIn(email ? true : false);
    if (email === "admin@gmail.com") setIsAdmin(true);
  };

  useEffect(() => {
    checkAdminHandler();
  }, [isAdmin]);

  return (
    <div>
      {loggedIn ? (
        isAdmin ? (
          <div>
            <GetOrder />
          </div>
        ) : (
          <div>
            <h1>Welcome, Customer!</h1>
            <Card>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email">
                    <Form.Label>Order Date</Form.Label>
                    <Form.Control type="date" ref={orderDate} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Company</Form.Label>
                    <Form.Control type="text" ref={company} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Owner</Form.Label>
                    <Form.Control type="text" ref={owner} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Item</Form.Label>
                    <Form.Control type="text" ref={item} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" ref={quantity} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="number" ref={weight} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Request for Shipment</Form.Label>
                    <Form.Control type="text" ref={shipmentRequest} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Tracking Id</Form.Label>
                    <Form.Control type="text" ref={trackingId} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Shipment Size</Form.Label>
                    <Form.Control type="text" ref={shipmentSize} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Box Count</Form.Label>
                    <Form.Control type="number" ref={boxCount} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>Specification</Form.Label>
                    <Form.Control type="text" ref={specification} required />
                  </Form.Group>
                  <Form.Group id="password">
                    <Form.Label>CheckList Quantity</Form.Label>
                    <Form.Control
                      type="text"
                      ref={checklistQuantity}
                      required
                    />
                  </Form.Group>
                  <Button
                    /*  disabled={loading} */
                    className="w-100"
                    type="submit"
                    style={{ marginTop: "1.2em" }}
                  >
                    SUBMIT
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        )
      ) : (
        <div>
          <h1>Login</h1>
          {/* <button onClick={handleLogin}>Login as Customer1</button> */}
        </div>
      )}
    </div>
  );
};

export default Order;
