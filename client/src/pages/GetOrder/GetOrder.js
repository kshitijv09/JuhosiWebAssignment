import React, { useEffect } from "react";
import axios from "axios";

export default function GetOrder() {
  const fetchTask = async () => {
    //console.log(key);
    const response = await axios.get("http://localhost:5000/user/orders", {
      headers: {
        Authorization: JSON.parse(localStorage.getItem("token")),
      },
    });
    console.log("Response", response.data);
    //setTask(response.data.tasks);
    //sortingHandler(task);
  };

  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <div>
      <h1>Hi, Admin</h1>
    </div>
  );
}
