import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import "./GetOrder.css";

export default function GetOrder() {
  const [orders, setOrders] = useState([]);
  const [sums, setSums] = useState({
    q1: 0,
    w1: 0,
    b1: 0,
    q2: 0,
    w2: 0,
    b2: 0,
  });

  const fetchTask = async () => {
    const response = await axios.get(
      `https://${process.env.REACT_APP_BASE_URL}/user/orders`,
      {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
      }
    );
    setOrders(response.data);
  };

  const sortTasks = () => {
    const { customer1, customer2 } = orders.reduce(
      (acc, order) => {
        const { user, quantity, weight, boxCount } = order;
        if (user === "customer1") {
          acc.customer1.q += parseInt(quantity);
          acc.customer1.w += parseFloat(weight);
          acc.customer1.b += parseInt(boxCount);
        } else if (user === "customer2") {
          acc.customer2.q += parseInt(quantity);
          acc.customer2.w += parseFloat(weight);
          acc.customer2.b += parseInt(boxCount);
        }
        return acc;
      },
      {
        customer1: { q: 0, w: 0, b: 0 },
        customer2: { q: 0, w: 0, b: 0 },
      }
    );

    setSums({
      q1: customer1.q,
      w1: customer1.w,
      b1: customer1.b,
      q2: customer2.q,
      w2: customer2.w,
      b2: customer2.b,
    });
  };

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    sortTasks();
  }, [orders]);

  return (
    <div className="outer">
      <Nav />
      <h1>Welcome, Admin</h1>
      <div className="table-cont">
        <table className="table">
          <thead>
            <tr>
              <td className="cell" style={{ backgroundColor: "#00ffff" }}>
                Item/Customer
              </td>
              <td className="cell">Customer1</td>
              <td className="cell">Customer2</td>
              <td className="cell">Total</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="cell" style={{ backgroundColor: "#ffe88d" }}>
                Quantity
              </td>
              <td className="cell" style={{ backgroundColor: "#d9d9d9" }}>
                {sums.q1}
              </td>
              <td className="cell" style={{ backgroundColor: "#d9d9d9" }}>
                {sums.q2}
              </td>
              <td className="cell" style={{ backgroundColor: "#d9d9d9" }}>
                {sums.q1 + sums.q2}
              </td>
            </tr>
            <tr>
              <td className="cell " style={{ backgroundColor: "#ffe88d" }}>
                Weight
              </td>
              <td className="cell" style={{ backgroundColor: "#00ffff" }}>
                {sums.w1}
              </td>
              <td className="cell" style={{ backgroundColor: "#00ffff" }}>
                {sums.w2}
              </td>
              <td className="cell" style={{ backgroundColor: "#00ffff" }}>
                {sums.w1 + sums.w2}
              </td>
            </tr>
            <tr>
              <td className="cell " style={{ backgroundColor: "#ffe88d" }}>
                Box Count
              </td>
              <td className="cell" style={{ backgroundColor: "#efefef" }}>
                {sums.b1}
              </td>
              <td className="cell" style={{ backgroundColor: "#efefef" }}>
                {sums.b2}
              </td>
              <td className="cell" style={{ backgroundColor: "#efefef" }}>
                {sums.b1 + sums.b2}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
