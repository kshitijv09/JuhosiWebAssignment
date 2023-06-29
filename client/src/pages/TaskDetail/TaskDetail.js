import React, { useState } from "react";
import axios from "axios";
import "./TaskDetail.css";
import UpdateTask from "../../components/UpdateTask/UpdateTask";

import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function TaskDetail() {
  const BASE_URL = process.env.BASE_URL;
  const location = useLocation();
  const task = location.state;

  const navigate = useNavigate();

  const closeHandler = () => {
    navigate("/tasks");
  };
  const delTask = async (id) => {
    await axios.delete(
      `https://mernbackend-gfpl.onrender.com/user/tasks/${id}`,
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );

    //console.log("Deleted");
    navigate("/tasks");
  };

  return (
    <div className="bg-img">
      <div className="page-container">
        <div className="update-container">
          <div className="t1">
            <UpdateTask task={task} />
          </div>
        </div>

        <div className="btn-container">
          <Button onClick={closeHandler} variant="warning">
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              delTask(task._id);
            }}
          >
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
}
