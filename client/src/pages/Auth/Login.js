import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../UI/Modal/Modal";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const userData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_BASE_URL}/auth/login`,
        userData
      );
      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("email", emailRef.current.value);

        navigate("/orders");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Modal>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ marginTop: "1.2em" }}
              >
                Log In
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2" style={{ color: "white" }}>
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Modal>
    </>
  );
}
