import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
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
    const response = await axios.get("http://localhost:5000/user/orders", {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    setOrders(response.data);
  };

  const sortTasks = () => {
    const { customer1, customer2 } = orders.reduce(
      (acc, order) => {
        const { user, quantity, weight, boxCount } = order;
        if (user === "customer1") {
          acc.customer1.q += parseInt(quantity);
          acc.customer1.w += parseInt(weight);
          acc.customer1.b += parseInt(boxCount);
        } else if (user === "customer2") {
          acc.customer2.q += parseInt(quantity);
          acc.customer2.w += parseInt(weight);
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
    <div>
      <h1>Hi, Admin</h1>
      <div className="table-cont">
        <Table striped="columns">
          <thead>
            <tr>
              <th>Item/Customer</th>
              <th>Customer 1</th>
              <th>Customer2</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Quantity</td>
              <td>{sums.q1}</td>
              <td>{sums.q2}</td>
              <td>{sums.q1 + sums.q2}</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>{sums.w1}</td>
              <td>{sums.w2}</td>
              <td>{sums.w1 + sums.w2}</td>
            </tr>
            <tr>
              <td>Box Count</td>
              <td>{sums.b1}</td>
              <td>{sums.b2}</td>
              <td>{sums.b1 + sums.b2}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
}
