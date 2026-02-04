import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import UKSList from "./components/UKSList";
import UksForm from "./components/UksForm";
import UKSDashboard from "./components/UKSDashboard";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState({});
  const [uksTks, setUksTks] = useState([]);

  const [formData, setFormData] = useState({});
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(!!user);

  async function fetchTodos() {
    const res = await axios.get(`${API}/todos`);
    setTodos(res.data);
  }
  async function fetchUksTks() {
    const res = await axios.get(`${API}/ukstks`);
    setData(res.data);
    setUksTks(res.data.ukstks);
  }

  useEffect(() => {
    // fetchTodos();
    fetchUksTks();
  }, []);

  return (
    <Container fluid="lg" className="py-4">
      {/* <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <h3 className="mb-3">UKS TKS</h3>
              <TodoForm onCreated={fetchTodos} />
              <hr />
              <TodoList
                todos={todos}
                onUpdated={fetchTodos}
                onDeleted={fetchTodos}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row> */}
      <Card className="mb-2">
        <Card.Header>
          <Container fluid>
            <Row>
              <Col>Completed: {data?.total || ""} </Col>
              <Col>Printed: {data?.printed || ""} </Col>
              <Col>Settled: {data?.settled || ""} </Col>
            </Row>
          </Container>
        </Card.Header>
        <Card.Body>
          <UksForm
            API={API}
            onCreated={fetchUksTks}
            formData={formData}
            setFormData={setFormData}
            uksTks={uksTks}
          />
        </Card.Body>
      </Card>
      <Table size="sm" bordered>
        <thead>
          <tr>
            <th colSpan={3}>
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                onChange={(e) => {
                  const filtered = data.ukstks?.filter(
                    (u) =>
                      u.name
                        ?.toLowerCase()
                        .includes(e.target.value.toLowerCase()) ||
                      u?.cardNumber?.toString().includes(e.target.value),
                  );
                  setUksTks(filtered || data.ukstks);
                }}
              />
            </th>
            {/* <th>NAME</th> */}
            <th>ID</th>
            <th>PHONE</th>
            <th>Completed</th>
            <th>Printed</th>
            <th>Settled</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uksTks.map((u, i) => (
            <UKSList
              u={u}
              i={i}
              key={i}
              setFormData={setFormData}
              setUser={setUser}
            />
          ))}
        </tbody>
      </Table>
      {user && (
        <UKSDashboard
          user={user}
          setUser={setUser}
          show={show}
          setShow={setShow}
          API={API}
          onUpdated={fetchUksTks}
        />
      )}
    </Container>
  );
}
