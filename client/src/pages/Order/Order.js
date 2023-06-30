import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import GetOrder from "../../components/GetOrder/GetOrder";
import "./Order.css";
import { Link } from "react-router-dom";
import Nav from "../../components/Nav/Nav";

const Order = () => {
  const email = localStorage.getItem("email");

  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [alert, setAlert] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      user: email,
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
      setAlert(true);
    } catch (e) {
      console.error("Error adding document: ", e.response);
    }
    orderDate.current.value = "";
    company.current.value = "";
    owner.current.value = "";
    item.current.value = "";
    quantity.current.value = "";
    weight.current.value = "";
    shipmentRequest.current.value = "";
    trackingId.current.value = "";
    shipmentSize.current.value = "";
    boxCount.current.value = "";
    specification.current.value = "";
    checklistQuantity.current.value = "";
  };

  const checkAdminHandler = () => {
    setLoggedIn(email ? true : false);
    if (email === "admin") setIsAdmin(true);
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
            <Nav />
            {alert && (
              <Alert variant="primary">
                Order submitted successfully!
                <button
                  onClick={() => {
                    setAlert(false);
                  }}
                >
                  Ok
                </button>
              </Alert>
            )}
            <h1>Welcome, {localStorage.getItem("email")}</h1>
            <div className="form-cont">
              <Card>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group id="orderDate">
                      <Form.Label>Order Date</Form.Label>
                      <Form.Control type="date" ref={orderDate} required />
                    </Form.Group>
                    <Form.Group id="company">
                      <Form.Label>Company</Form.Label>
                      <Form.Control type="text" ref={company} required />
                    </Form.Group>
                    <Form.Group id="owner">
                      <Form.Label>Owner</Form.Label>
                      <Form.Control type="text" ref={owner} required />
                    </Form.Group>
                    <Form.Group id="item">
                      <Form.Label>Item</Form.Label>
                      <Form.Control type="text" ref={item} required />
                    </Form.Group>
                    <Form.Group id="quantity">
                      <Form.Label>Quantity</Form.Label>
                      <Form.Control
                        type="number"
                        ref={quantity}
                        pattern="[0-9]*"
                        required
                      />
                    </Form.Group>
                    <Form.Group id="weight">
                      <Form.Label>Weight</Form.Label>
                      <Form.Control
                        type="number"
                        ref={weight}
                        min="0"
                        step="1"
                        required
                      />
                    </Form.Group>
                    <Form.Group id="shipmentRequest">
                      <Form.Label>Request for Shipment</Form.Label>
                      <Form.Control
                        type="text"
                        ref={shipmentRequest}
                        required
                      />
                    </Form.Group>
                    <Form.Group id="trackingId">
                      <Form.Label>Tracking Id</Form.Label>
                      <Form.Control type="text" ref={trackingId} required />
                    </Form.Group>
                    <Form.Group id="shipmentSize">
                      <Form.Label>Shipment Size (LXBXH)</Form.Label>
                      <Form.Control type="text" ref={shipmentSize} required />
                    </Form.Group>
                    <Form.Group id="boxCount">
                      <Form.Label>Box Count</Form.Label>
                      <Form.Control
                        type="number"
                        ref={boxCount}
                        min="0"
                        step="1"
                        required
                      />
                    </Form.Group>
                    <Form.Group id="specification">
                      <Form.Label>Specification</Form.Label>
                      <Form.Control type="text" ref={specification} required />
                    </Form.Group>
                    <Form.Group id="checklistQuantity">
                      <Form.Label>CheckList Quantity</Form.Label>
                      <Form.Control
                        type="text"
                        ref={checklistQuantity}
                        required
                      />
                    </Form.Group>
                    <Button
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
          </div>
        )
      ) : (
        <div>
          <Link to="/login">
            <h1>Login</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Order;
