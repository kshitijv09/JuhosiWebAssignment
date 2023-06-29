import React, { useState } from "react";
import axios from "axios";

const Order = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orderDate, setOrderDate] = useState("");
  const [company, setCompany] = useState("");
  const [owner, setOwner] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleLogin = async () => {
    const response = await axios.post("/login", {
      id: "customer1", // Replace with the actual login ID
      password: "password", // Replace with the actual password
    });

    if (response.data.success) {
      setLoggedIn(true);
      setIsAdmin(response.data.isAdmin);
    }
  };

  const handleSubmit = async () => {
    await axios.post("/submit", {
      orderDate,
      company,
      owner,
      item,
      quantity,
    });

    // Clear the form fields after submission
    setOrderDate("");
    setCompany("");
    setOwner("");
    setItem("");
    setQuantity("");
  };

  const loadData = async () => {
    const response = await axios.get("/data");
    console.log(response.data); // Display the data in the browser console
  };

  const checkAdminHandler = () => {
    setLoggedIn(localStorage.getItem("orderEmail") ? true : false);
    if (localStorage.getItem("orderEmail") == "admin@gmail.com")
      setIsAdmin(true);
  };

  useEffect(() => {
    checkAdminHandler;
  }, [isAdmin]);

  return (
    <div>
      {loggedIn ? (
        isAdmin ? (
          <div>
            <h1>Welcome, Admin!</h1>
            <button onClick={loadData}>Load Data</button>
          </div>
        ) : (
          <div>
            <h1>Welcome, Customer!</h1>
            <label>Order Date:</label>
            <input
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
            <br />
            <label>Company:</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <br />
            <label>Owner:</label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
            />
            <br />
            <label>Item:</label>
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <br />
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )
      ) : (
        <div>
          <h1>Login</h1>
          <button onClick={handleLogin}>Login as Customer1</button>
        </div>
      )}
    </div>
  );
};

export default Order;
