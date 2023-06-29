import React, { useState, useEffect } from "react";
import AddTask from "../../components/AddTask/AddTask";
import Nav from "../../components/Nav/Nav";
import { useNavigate, Navigate } from "react-router-dom";
import "./Task.css";
import axios from "axios";

export default function Task() {
  const BASE_URL = process.env.BASE_URL;
  const [task, setTask] = useState([]);
  const [modal, setModal] = useState(false);
  const [checked, isChecked] = useState(false);
  const [selectedButton, setSelectedButton] = useState("DueDate");

  const navigate = useNavigate();

  const sortingHandler = (category) => {
    setSelectedButton(category);
    if (category === "Status") {
      var arr = [...task];
      arr.sort(
        (a, b) =>
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          a.completed.length - b.completed.length
      );
      //console.log(arr);
      setTask(arr);
      //console.log("T2 is", task);
    } else if (category === "DueDate") {
      console.log(category);
      var arr = [...task];
      arr.sort(
        (a, b) =>
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          new Date(a.date) - new Date(b.date)
      );

      setTask(arr);
      //console.log("T2 is", task);
    }
  };

  const fetchTask = async () => {
    const key = JSON.parse(localStorage.getItem("token"));
    const config = `Bearer ${key}`;
    console.log(key);
    const response = await axios.get(
      `https://mernbackend-gfpl.onrender.com/user/tasks`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    console.log("bh", response.data);
    setTask(response.data.tasks);
    sortingHandler(task);
  };

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    console.log("Task is", task);
  }, [task]);

  const modalHandler = () => {
    setModal((prevValue) => {
      return !prevValue;
    });
    fetchTask();
  };

  const taskDetailHandler = (task) => {
    navigate(`/tasks/${task._id}`, { state: task });
  };

  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Nav />
      {modal && <AddTask onConfirm={modalHandler} />}
      <div className="task-container">
        <div className="sorting">
          <div className="sort-btn">Sort By :</div>
          <div
            className="sort-btn"
            id={selectedButton === "DueDate" ? "selected-btn" : ""}
            onClick={() => {
              sortingHandler("DueDate");
            }}
          >
            DueDate
          </div>
          <div
            className="sort-btn"
            id={selectedButton === "Status" ? "selected-btn" : ""}
            onClick={() => {
              sortingHandler("Status");
            }}
          >
            Status
          </div>
        </div>
        <div className="task-heading">
          <div style={{ width: "24%" }} className="task-head">
            Task
          </div>
          <div style={{ width: "24%" }} className="task-head">
            Description
          </div>
          <div style={{ width: " 24%" }} className="task-head">
            Due Date
          </div>
          <div style={{ width: " 24%" }} className="task-head status">
            Status
          </div>
        </div>
        <div className="display-task">
          {task.map((singleTask, index) => (
            <div
              className="task-card"
              onClick={() => {
                taskDetailHandler(singleTask);
              }}
            >
              <div key={index} style={{ width: "24%" }} className="task-prop">
                {singleTask.taskName}
              </div>
              <div style={{ width: "24%" }} className="task-prop">
                {singleTask.description.substring(0, 10)}...{" "}
              </div>

              <div style={{ width: "24%" }} className="task-prop">
                {singleTask.date.substring(0, 10)}{" "}
              </div>
              <div style={{ width: "24%" }} className="task-prop">
                {singleTask.completed}{" "}
              </div>
            </div>
          ))}
        </div>
        <div className="add-task">
          <button onClick={modalHandler} className="add-btn">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
