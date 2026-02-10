import { useState, useEffect } from "react";
import { Container, Form, FormGroup, Button, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { donateBlood } from "../services/donateService";
import { removeToken } from "../services/TokenServices";
import { removeRole } from "../services/RoleServices";
import { toast, Slide } from "react-toastify";
import axios from "axios";

export function DonateForm() {
  const [formData, setFormData] = useState({
    user_id: "",
    blood_type: "",       // ✅ kept open for manual input
    donation_date: "",
    bank_id: "",
  });

  const [bloodBanks, setBloodBanks] = useState([]);
  const navigate = useNavigate();

  // ✅ Load blood banks
  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const res = await axios.get("http://localhost:2000/bloodbanks");
        setBloodBanks(res.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load blood banks", {
          position: "top-right",
          theme: "colored",
          transition: Slide,
        });
      }
    };
    fetchBloodBanks();

    // ✅ Get user_id from localStorage
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setFormData((prev) => ({ ...prev, user_id: storedUserId }));
    }
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Submit donation form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split("T")[0];

    if (formData.donation_date < today) {
      toast.error("Donation date cannot be in the past!", {
        position: "top-right",
        theme: "colored",
        transition: Slide,
      });
      return;
    }

    try {
      await donateBlood(formData);
      toast.success("Donation form submitted successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Slide,
      });

      // Reset fields except user_id
      setFormData({
        user_id: formData.user_id,
        blood_type: "",
        donation_date: "",
        bank_id: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit donation form.",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        }
      );
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    removeToken();
    removeRole();
    localStorage.removeItem("user_id");
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
      transition: Slide,
    });
    setTimeout(() => navigate("/Login"), 1500);
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "80vh",
        backgroundColor: "#FCECEC",
        margin: "0",
        padding: "0",
      }}
    >
      {/* Logout Button
      <div className="p-3">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div> */}

      <h3
        style={{
          textAlign: "center",
          fontWeight: "700",
          color: "#b30000",
          letterSpacing: "1px",
        }}
      >
        Enter Details To Donate Blood
      </h3>

      <Row className="justify-content-center mt-5">
        <Form onSubmit={handleSubmit} style={{ width: "700px" }}>
          {/* ✅ Open Blood Group Field */}
          <Form.Group className="mb-3">
            <Form.Label>Enter Your Blood Group</Form.Label>
            <Form.Control
              type="text"
              name="blood_type"
              value={formData.blood_type}
              onChange={handleChange}
              placeholder="e.g. A+, O-, B+"
              required
            />
          </Form.Group>

          {/* Donation Date */}
          <FormGroup className="mb-3">
            <Form.Label>Book Your Slot</Form.Label>
            <Form.Control
              type="date"
              name="donation_date"
              value={formData.donation_date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />
          </FormGroup>

          {/* Blood Bank Dropdown */}
          <Form.Group className="mb-3">
            <Form.Label>Select Blood Bank</Form.Label>
            <Form.Select
              name="bank_id"
              value={formData.bank_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Blood Bank --</option>
              {bloodBanks.map((bank) => (
                <option key={bank.bank_id} value={bank.bank_id}>
                  {bank.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="danger" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
