import { useState, useRef } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../UI/Modal/Modal";

export default function Signup() {
  const BASE_URL = process.env.BASE_URL;
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    setError("");
    setLoading(true);

    const userData = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      conPass: passwordConfirmRef.current.value,
    };

    localStorage.setItem("username", usernameRef.current.value);
    try {
      await axios.post(
        `https://mernbackend-gfpl.onrender.com/auth/signup`,
        userData
      );

      navigate("/login");
    } catch (err) {
      setError("Error msg is " + err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Modal>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="name" ref={usernameRef} required />
              </Form.Group>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button
                disabled={loading}
                className="w-100"
                type="submit"
                style={{ marginTop: "1.2em" }}
              >
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
      </Modal>
    </>
  );
}
