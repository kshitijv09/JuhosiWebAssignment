import React from "react";
import "./Nav.css";

import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Nav(props) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="nav-bar">
      <div className="text-container">
        <div>
          <h1 style={{ fontSize: "1.8em" }}> TASK MANAGER APP</h1>
        </div>
        <div>
          <h3 className="text">Welcome {localStorage.getItem("username")}</h3>
        </div>
      </div>
      <div className="logout-container" onClick={handleLogout}>
        <Button variant="primary" className="btn">
          Logout
        </Button>
      </div>
    </div>
  );
}
