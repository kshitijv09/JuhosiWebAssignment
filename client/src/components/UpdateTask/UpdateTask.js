import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useAsyncValue, useNavigate } from "react-router-dom";

import "./UpdateTask.css";

export default function UpdateTask({ task }) {
  const BASE_URL = process.env.BASE_URL;
  const [title, setTitle] = useState(task.taskName);
  const [desc, setDesc] = useState(task.description);
  const [duedate, setDueDate] = useState(task.date.substring(0, 10));
  const [completed, setCompletion] = useState(task.completed);

  const navigate = useNavigate();

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://mernbackend-gfpl.onrender.com/user/tasks/${task._id}`,
        {
          taskName: title,
          description: desc,
          date: duedate,
          completed: completed,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      navigate("/tasks");
    } catch (err) {
      console.log("Error is", err.response);
    }
  };

  return (
    <>
      <div className="add-container up-container">
        <div className="title">
          <h1> Update Task</h1>
        </div>
        <Form onSubmit={updateHandler}>
          <Form.Group id="title">
            <Form.Label className="head">Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              required
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="description">
            <Form.Label className="head">Description</Form.Label>
            <Form.Control
              type="text"
              value={desc}
              required
              onChange={(event) => {
                setDesc(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="duedate">
            <Form.Label className="head">Due Date</Form.Label>
            <Form.Control
              type="date"
              value={duedate}
              required
              onChange={(event) => {
                setDueDate(event.target.value);
              }}
            />
          </Form.Group>
          <Form.Group id="completed">
            <Form.Label className="head">Completion Status</Form.Label>
            <Form.Control
              type="text"
              value={completed}
              required
              onChange={(event) => {
                setCompletion(event.target.value);
              }}
            />
          </Form.Group>
          <div className="btn-container">
            <Button className="btn" type="submit">
              Update Task
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
}
