import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { toast, Slide } from "react-toastify";
import { statesAndCities } from "../data/statesAndCities";
import "bootstrap/dist/css/bootstrap.min.css";
import { register } from "../services/LoginServices.js";

export function Register() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    user_password: "",
    confirmPassword: "",
    type: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: "" });
  };

  const cities = formData.state ? statesAndCities[formData.state] || [] : [];

  // ✅ Regex validation function
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const phoneRegex = /^[0-9]{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

    if (!nameRegex.test(formData.name)) {
      toast.error("Enter a valid name (letters only, min 3 chars)", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!phoneRegex.test(formData.phone)) {
      toast.error("Enter a valid 10-digit phone number", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!formData.state || !formData.city) {
      toast.error("Please select a state and city", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!passwordRegex.test(formData.user_password)) {
      toast.error(
        "Password must be at least 6 characters with uppercase, lowercase, and a number",
        {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        }
      );
      return false;
    }

    if (formData.user_password !== formData.confirmPassword) {
      toast.error("Passwords do not match!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!formData.type) {
      toast.error("Please select a user type", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await register(formData);

      if (response.status === 200) {
        toast.success("Registration successful! Redirecting to login...", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        });
        setTimeout(() => navigate("/Login"), 3000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error registering user. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          transition: Slide,
        }
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#FCECEC" }}
    >
      <Card
        style={{
          width: "28rem",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Card.Title
          className="text-center text-danger mb-4"
          style={{ fontSize: "1.8rem", fontWeight: "bold" }}
        >
          Register
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPhone" label="Phone" className="mb-3">
            <Form.Control
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Form.Group className="mb-3">
            <Form.Label>Select State</Form.Label>
            <Form.Select name="state" value={formData.state} onChange={handleStateChange}>
              <option value="">-- Select State --</option>
              {Object.keys(statesAndCities).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Select City</Form.Label>
            <Form.Select
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.state}
            >
              <option value="">-- Select City --</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              name="user_password"
              placeholder="Password"
              value={formData.user_password}
              onChange={handleChange}
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </FloatingLabel>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Select Type</Form.Label>
            <div>
              <Form.Check
                inline
                label="Donor"
                name="type"
                type="radio"
                value="donor"
                checked={formData.type === "donor"}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="Admin"
                name="type"
                type="radio"
                value="admin"
                checked={formData.type === "admin"}
                onChange={handleChange}
              />
            </div>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="danger" type="submit" style={{ fontSize: "18px" }}>
              Register
            </Button>
            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <a href="/Login" style={{ color: "#b30000" }}>
                Login here
              </a>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
