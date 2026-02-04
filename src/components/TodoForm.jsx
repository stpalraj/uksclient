import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function TodoForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API}/todos`, { title: title.trim() });
      setTitle("");
      onCreated();
    } catch (err) {
      console.error(err);
      alert("Error creating todo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form onSubmit={submit}>
      <InputGroup>
        <Form.Control
          placeholder="Add todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}
