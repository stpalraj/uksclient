import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
const UksForm = ({ API, onCreated, formData, setFormData, uksTks }) => {
  const [loading, setLoading] = useState(false);
  async function formSubmit(e) {
    e.preventDefault();
    // Check Duplicate UKSTKS or Card Number
    if (!formData?._id) {
      const existingUkstk = uksTks.find((u) => u.ukstks === formData.ukstks);
      if (existingUkstk) {
        alert("UKSTKS already exists");
        return;
      }
      const existingCard = uksTks.find(
        (u) => u.cardNumber === formData.cardNumber,
      );
      if (existingCard) {
        if (
          !confirm(
            `Card Number ${formData.cardNumber} ${existingCard.name || ""} already exists. Do you want to proceed?`,
          )
        )
          return;
      }
    }
    setLoading(true);
    try {
      const hasFile = formData?.image && formData.image instanceof File;
      if (hasFile) {
        const payload = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
          if (val === undefined || val === null) return;
          // skip _id when creating; keep when updating (server may ignore)
          if (key === "_id" && !formData._id) return;
          // Append files/values; FormData handles File objects directly
          if (Array.isArray(val)) {
            val.forEach((v) => payload.append(key, v));
          } else {
            payload.append(key, val);
          }
        });
        if (formData?._id) {
          await axios.put(`${API}/ukstks/${formData._id}`, payload);
        } else {
          await axios.post(`${API}/ukstks`, payload);
        }
      } else {
        if (formData?._id) {
          await axios.put(`${API}/ukstks/${formData._id}`, formData);
        } else {
          await axios.post(`${API}/ukstks`, formData);
        }
      }
      setFormData({});
      onCreated();
    } catch (err) {
      console.error(err);
      alert("Error creating UKS TKS");
      return;
    } finally {
      setLoading(false);
    }
  }

  const { name, ukstks, cardNumber, phone } = formData;
  function onChange(e) {
    const { id, value } = e.target;
    if (["cardNumber", "ukstks", "phone"].includes(id) && !/^\d*$/.test(value))
      return;

    if (!value.trim()) setFormData((prev) => ({ ...prev, [id]: "" }));
    else setFormData((prev) => ({ ...prev, [id]: value }));
  }
  return (
    <Form onSubmit={formSubmit}>
      <Container fluid>
        <Row className="g-2">
          <Col md={6}>
            <Form.Group as={Row} controlId="cardNumber">
              <Form.Label xs={4} column="sm">
                Card Number
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  value={cardNumber || ""}
                  onChange={onChange}
                  required
                  maxLength="5"
                  minLength="5"
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group as={Row} controlId="ukstks">
              <Form.Label xs={4} column="sm">
                Form Number
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  value={ukstks || ""}
                  onChange={onChange}
                  maxLength="7"
                  minLength="7"
                  required
                />
              </Col>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group as={Row} controlId="name">
              <Form.Label xs={4} column="sm">
                Name
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  value={name || ""}
                  onChange={onChange}
                  required
                />
              </Col>
              <Form.Group as={Col} xs={3} controlId="image">
                <Form.Control
                  size="sm"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFormData((prev) => ({ ...prev, image: file }));
                    }
                  }}
                />
              </Form.Group>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group as={Row} controlId="phone">
              <Form.Label xs={4} column="sm">
                Phone
              </Form.Label>
              <Col>
                <Form.Control
                  size="sm"
                  value={phone || ""}
                  onChange={onChange}
                  maxLength="10"
                />
              </Col>
              <Col xs="auto">
                {formData?._id && (
                  <Button
                    variant="warning"
                    className="me-2"
                    size="sm"
                    type="button"
                    onClick={() => setFormData({})}
                  >
                    Reset
                  </Button>
                )}
                <Button size="sm" type="submit" disabled={loading}>
                  {formData?._id
                    ? loading
                      ? "Updating..."
                      : "Update"
                    : loading
                      ? "Submitting..."
                      : "Submit"}
                  {loading && (
                    <span
                      className="ms-2 spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  )}
                </Button>
              </Col>
            </Form.Group>
          </Col>
          <Col md={12} className="mb-3">
            <small>
              Note: Card Number and Form Number should be numeric only.
            </small>
          </Col>
        </Row>
      </Container>
    </Form>
  );
};

export default UksForm;
