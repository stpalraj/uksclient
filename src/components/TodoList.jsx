import React from "react";
import { ListGroup, Button, Form } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function TodoList({ todos, onUpdated, onDeleted }) {
  async function toggleDone(todo) {
    try {
      await axios.put(`${API}/todos/${todo._id}`, { done: !todo.done });
      onUpdated();
    } catch (err) {
      console.error(err);
    }
  }

  async function remove(todo) {
    if (!confirm("Delete this todo?")) return;
    try {
      await axios.delete(`${API}/todos/${todo._id}`);
      onDeleted();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <ListGroup>
      {todos.map((t) => (
        <ListGroup.Item
          key={t._id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <Form.Check
              type="checkbox"
              checked={t.done}
              onChange={() => toggleDone(t)}
              inline
              label={
                <span
                  style={{ textDecoration: t.done ? "line-through" : "none" }}
                >
                  {t.title}
                </span>
              }
            />
          </div>
          <div>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => remove(t)}
            >
              Delete
            </Button>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
