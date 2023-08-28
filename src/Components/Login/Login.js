import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "./UserAuthContext";
import { Container, Row, Col } from "react-bootstrap";
import "./Login.scss";
import Toaster from "../Common/Toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);
    setShowToast(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (validateEmail(email)) {
        try {
            await logIn(email, password);
            showMessage("Successfully Signed In","success")
            navigate("/");
          } catch (err) {
            showMessage("There was an error while Logging in","error")
            setError(err.message);
          }
      }
    setError("Email is not valid");
    return false;
    
  };

  return (
    <>
    <Container style={{ width: "400px" }}>
            <Row>
                <Col>
      <div className="p-4 box">
        <h2 className="mb-3 loginheaderContainer">Sign In</h2>
        {error && <Alert variant="danger" id = "testError">User / Password Not Valid</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Sign In
            </Button>
          </div>
        </Form>
        <hr />
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
      </Col>
            </Row>
        </Container>
        <Toaster showToast={showToast} setShowToast={setShowToast} message={message} type={type} />
        </>
  );
};

export default Login;

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (regex.test(email)) {
      return true;
    }
    return false;
  };