import React, { useEffect, useState } from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="primary-heading--container">
      <h1 className="heading">ORDER MANAGER APP</h1>
      <h1 className="primary-heading">
        Customers can Submit Orders as per requirement
      </h1>
      <h1 className="secondary-heading">Only admin can view order details</h1>
      <h1 className="third-heading">
        Manager Orders Effectively with this Order Manager. LogIn to find out
        How.
      </h1>
      <div className="fourth-heading">
        <Link to="/signup">
          <div> Sign Up |</div>
        </Link>
        <Link to="/login">
          <div>Log In </div>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
