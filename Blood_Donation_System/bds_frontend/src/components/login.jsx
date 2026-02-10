import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, storeToken } from "../services/TokenServices";
import { login } from "../services/LoginServices";
import { storeRole } from "../services/RoleServices";
import { toast, Slide } from "react-toastify";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    user_password: "",
    type: "",
  });

  const navigate = useNavigate();

  // Redirect if token exists
  useEffect(() => {
    const token = getToken();
    if (token) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Regex validation
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        transition: Slide,
      });
      return false;
    }

    if (!passwordRegex.test(formData.user_password)) {
      toast.error(
        "Password must be at least 6 characters, with uppercase, lowercase, and a number",
        {
          position: "top-right",
          autoClose: 4000,
          theme: "colored",
          transition: Slide,
        }
      );
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

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log("Login request:", formData);
      const response = await login(formData);
      console.log("Response:", response.data);

      if (response.status === 200) {
        storeToken(response.data.token);
        storeRole(formData.type);
        if (response.data.user_id) {
          localStorage.setItem("user_id", response.data.user_id);
        }

        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          transition: Slide,
        });

        setTimeout(() => {
          if (formData.type === "admin") navigate("/Dashboard");
          else if (formData.type === "donor") navigate("/Donate");
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(
        error.response?.data?.message || "Invalid credentials or server error.",
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
      style={{ minHeight: "100vh", backgroundColor: "#FCECEC", margin: 0, padding: 0 }}
    >
      <Card
        style={{
          width: "25rem",
          padding: "30px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <Card.Title
          className="text-center text-danger mb-4"
          style={{ fontSize: "1.8rem", fontWeight: "bold" }}
        >
          Login
        </Card.Title>

        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
            />
          </FloatingLabel>

          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-4">
            <Form.Control
              type="password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              placeholder="Password"
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

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Check type="checkbox" label="Remember me" />
            <a href="#" style={{ fontSize: "14px", color: "#b30000" }}>
              Forgot Password?
            </a>
          </div>

          <div className="d-grid gap-2">
            <Button variant="danger" type="submit" style={{ fontSize: "18px" }}>
              Log In
            </Button>
            <p className="text-center mt-3" style={{ fontSize: "14px" }}>
              Don’t have an account?{" "}
              <a href="/Register" style={{ color: "#b30000" }}>
                Register here
              </a>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
}
