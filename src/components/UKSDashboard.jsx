import React, { useEffect } from "react";
import { Col, Modal, Row, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const UKSDashboard = ({ show, setShow, user, setUser, API, onUpdated }) => {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => {
    setUser(null);
    setShow(false);
  };
  useEffect(() => {
    setShow(!!user);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put(`${API}/ukstks/${user._id}/settle-print`, {
        cardPrinted: user.cardPrinted,
        cardSettled: user.cardSettled,
      });
      onUpdated();
      alert("UKS TKS updated successfully");
    } catch (error) {
      console.error("Error updating UKS TKS:", error);
      alert("Error updating UKS TKS");
    } finally {
      handleClose();
      setLoading(false);
    }
  };
  return (
    <Modal show={show} size="lg" centered>
      <Modal.Header closeButton className="pb-0" onClick={handleClose}>
        <h2 className="text-center pb-0">UKS Dashboard</h2>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Img
            style={{
              height: "200px",
              overflow: "hidden",
              objectPosition: "top",
              objectFit: "cover",
            }}
            variant="top"
            src={user?.image || ""}
          />
          <Card.Body>
            <Card.Title className="text-uppercase">
              {user?.name || "User"}
            </Card.Title>
            <div>
              <Row>
                <Col>
                  <div>
                    <small>ID:</small>
                    <strong> UKS TKS {user?.ukstks || "N/A"}</strong>
                  </div>
                  <div>
                    <small>UFO No:</small>
                    <strong> {user?.cardNumber || "N/A"}</strong>
                  </div>
                  <div>
                    <small>Card Printed:</small>
                    <strong> {user?.cardPrinted ? "Yes" : "No"}</strong>
                  </div>
                  <div>
                    <small>Card Dispatch:</small>
                    <strong> {user?.cardSettled ? "Yes" : "No"}</strong>
                  </div>
                </Col>
                <Col>
                  <Form>
                    <Form.Check
                      id="cardPrinted"
                      type="checkbox"
                      label="Card Printed"
                      checked={user?.cardPrinted || false}
                      onChange={(e) =>
                        setUser({ ...user, cardPrinted: e.target.checked })
                      }
                    />
                    <Form.Check
                      id="cardSettled"
                      type="checkbox"
                      label="Card Dispatch"
                      checked={user?.cardSettled || false}
                      onChange={(e) =>
                        setUser({ ...user, cardSettled: e.target.checked })
                      }
                    />
                    <Row className="mt-3">
                      <Col align="right">
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={handleSubmit}
                          disabled={loading}
                        >
                          {loading ? "Updating..." : "Update UKS TKS"}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
};

export default UKSDashboard;
