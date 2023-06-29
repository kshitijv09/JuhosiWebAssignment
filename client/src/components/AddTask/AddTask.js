import React, { useRef } from "react";
import Modal from "../../UI/Modal/Modal";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./AddTask.css";

export default function AddTask(props) {
  const title = useRef();
  const description = useRef();
  const duedate = useRef();
  const completed = useRef();

  const dataStoreHandler = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://mernbackend-gfpl.onrender.com/user/tasks",
        {
          taskName: title.current.value,
          date: duedate.current.value,
          description: description.current.value,
          completed: completed.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e.response);
    }
    props.onConfirm();
  };

  return (
    <Modal>
      <div className="add-cont">
        <Form onSubmit={dataStoreHandler}>
          <Form.Group id="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" ref={title} required />
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={description} required />
          </Form.Group>
          <Form.Group id="duedate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control type="date" ref={duedate} required />
          </Form.Group>
          <Form.Group id="completed">
            <Form.Label>Completion Status</Form.Label>
            <Form.Control type="dropdown" ref={completed} required />
          </Form.Group>
          <Button className="w-100" type="submit">
            Create Task
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
