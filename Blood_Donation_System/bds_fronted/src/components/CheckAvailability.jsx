import { useState, useEffect } from "react";
import { Container, Row, Form, Button, Table } from "react-bootstrap";
import { getAvailableByType } from "../services/LoginServices";
import { Receiver } from "./Receiver";
import { toast } from "react-toastify";

export function CheckAvailability() {
  const [formData, setFormData] = useState(null);
  const [selectedBloodType, setSelectedBloodType] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showReceiverModal, setShowReceiverModal] = useState(false);
  const [reloadTrigger, setReloadTrigger] = useState(false);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch availability
  useEffect(() => {
    if (!selectedBloodType) return;

    const fetchSearchResult = async () => {
      try {
        const response = await getAvailableByType(selectedBloodType);
        if (response.data) {
          setFormData(response.data);
        } else {
          setFormData(null);
        }
      } catch (error) {
        console.error(error);
        setFormData(null);
      }
    };

    fetchSearchResult();
  }, [selectedBloodType, reloadTrigger]);

  const handleSearch = () => {
    if (selectedBloodType) {
      setShowTable(true);
    }
  };

  // Refresh availability data after receiving blood
  const refreshAvailability = () => {
    toast.info("Refreshing availability data...", {
      position: "top-center",
      autoClose: 1500,
    });
    setReloadTrigger((prev) => !prev);
  };

  return (
    <div>
      <Container
        fluid
        style={{
          minHeight: "80vh",
          backgroundColor: "#FCECEC",
          margin: "0",
          padding: "0",
        }}
      >
        <Row>
          <h2
            className="mt-4 mx-3"
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: "#b30000",
              letterSpacing: "1px",
            }}
          >
            Check Availability
          </h2>
        </Row>

        {/* Dropdown & Search */}
        <Row className="justify-content-center mt-4">
          <Form style={{ width: "300px" }}>
            <Form.Group controlId="bloodTypeSelect">
              <Form.Label>Select Blood Type</Form.Label>
              <Form.Control
                as="select"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
              >
                <option value="">-- Select Blood Type --</option>
                {bloodTypes.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button
              variant="danger"
              className="mt-3 w-100"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form>
        </Row>

        {/* Results Table */}
        {showTable && formData && formData.available_units > 0 && (
          <Row className="mt-5 justify-content-center">
            <Table striped bordered hover style={{ width: "80%" }}>
              <thead>
                <tr>
                  <th>Blood Type</th>
                  <th>Quantity</th>
                  <th>Last Updated</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formData.blood_type}</td>
                  <td>{formData.available_units}</td>
                  <td>{new Date(formData.last_updated).toLocaleDateString()}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => setShowReceiverModal(true)}
                    >
                      Receive
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Row>
        )}

        {/* ❌ If no record or zero quantity */}
        {showTable && (!formData || formData.available_units <= 0) && (
          <Row className="justify-content-center mt-5">
            <Container
              style={{
                width: "50%",
                textAlign: "center",
                backgroundColor: "#ffe6e6",
                borderRadius: "10px",
                padding: "20px",
                color: "#b30000",
                fontWeight: "600",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              ❌ Blood does not exist in this blood bank or is out of stock.
            </Container>
          </Row>
        )}
      </Container>

      {/* Receiver Modal */}
      {formData && (
        <Receiver
          show={showReceiverModal}
          handleClose={() => setShowReceiverModal(false)}
          bloodType={formData.blood_type}
          bankId={formData.bank_id}
          onReceiveSuccess={refreshAvailability}
        />
      )}
    </div>
  );
}
