import { useState } from "react";
import { Form, Button, Alert,Row, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export function Donate(){
        const [formData, setFormData] = useState({
        age: "",
        weight: "",
        hemoglobin: "",
        lastDonationDays: "",
        pregnant: false,
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        });
    };

  const checkEligibility = (e) => {
    e.preventDefault();
    const { age, weight, hemoglobin, lastDonationDays, pregnant } = formData;
    
    // Convert to numbers
    const ageNum = Number(age);
    const weightNum = Number(weight);
    const hbNum = Number(hemoglobin);
    const lastDonationNum = Number(lastDonationDays);

    // Basic Eligibility Logic
    if (ageNum < 18 || ageNum > 65) {
      setMessage("You must be between 18 and 65 years old to donate blood.");
    } else if (weightNum < 50) {
      setMessage("You must weigh at least 50 kg to donate blood.");
    } else if (hbNum < 12.5) {
      setMessage("Your hemoglobin level should be at least 12.5 g/dL.");
    } else if (lastDonationNum < 120) {
      setMessage("You can donate only after 120 days from your last donation.");
    } else if (pregnant) {
      setMessage("Pregnant women are not allowed to donate blood.");
    } else {
      // If eligible
      navigate("/DonateForm"); // you can pass data to the next form
      return;
    }
  };

  return (
    <Container fluid
        style={{
          minHeight: "80vh",
          backgroundColor: "#FCECEC",
          margin: "0",
          padding: "0",
        }}>


        <h3 style={{
        textAlign: "center",
        fontWeight: "700",             // makes text bold
        color: "#b30000",
        letterSpacing: "1px",
        }}>Check Eligibility for Blood Donation</h3>
      
      <Row className="justify-content-center mt-5" >
        
        <Form onSubmit={checkEligibility} style={{ width: "700px" }}>

                <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" name="age" value={formData.age} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Weight (kg)</Form.Label>
                <Form.Control type="number" name="weight" value={formData.weight} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Hemoglobin (g/dL)</Form.Label>
                <Form.Control type="number" step="0.1" name="hemoglobin" value={formData.hemoglobin} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Days Since Last Donation</Form.Label>
                <Form.Control type="number" name="lastDonationDays" value={formData.lastDonationDays} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Are you pregnant?" name="pregnant" checked={formData.pregnant} onChange={handleChange} />
                </Form.Group>

                <Button variant="danger" type="submit">
                Check Eligibility
                </Button>
            </Form>
      </Row>
      

      {message && <Alert className="mt-3" variant="danger">{message}</Alert>}
    </Container>
  );
};

