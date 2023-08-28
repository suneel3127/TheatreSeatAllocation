import "./Header.scss";
import React, { useState, useEffect } from "react";

import { Link , useNavigate} from "react-router-dom";

import { Form, InputGroup, Button, Container, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { useUserAuth } from "../Login/UserAuthContext";
import Toaster from "../Common/Toaster";


function Header(){
  const navigate = useNavigate();
  const { logOut, user } = useUserAuth();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showMessage = (msg, msgType) => {
    setMessage(msg);
    setType(msgType);
    setShowToast(true);
  };


  const handleLogout = async () => {
    try {
      await logOut();
      showMessage("Signed out Succesfully","success")
      navigate("/");
      
    } catch (error) {
      showMessage("Error Signing out","error")
    }
  };


    return (
        <Navbar bg="dark" className="mb-3">
          <Container fluid className="appHeader">
          <Link to="/" className="homeLink">
            <Navbar.Brand>Theatre Seat Allocation</Navbar.Brand>
            </Link>
            <Form className="d-flex searchForm">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </InputGroup.Text>
                  <Form.Control
                  type="search"
                  placeholder="Search for movies, series etc"
                  className="me-2"
                  aria-label="Search"
                  />
              </InputGroup>
            </Form>
          </Container>
          {(user && user.email)?<><div className="userDetails">Hello Welcome {user && user.email}</div><Button variant="Link" className="signinbtn" onClick={handleLogout}>Signout</Button></>:
          <Button variant="Link" className="signinbtn" onClick={()=>{navigate("/signin")}}>Sign In/Sign Up</Button>}
          <Toaster showToast={showToast} setShowToast={setShowToast} message={message} type={type} />
          
        </Navbar>
    )
}
export default Header
