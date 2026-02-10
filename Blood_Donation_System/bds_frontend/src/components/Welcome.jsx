import React from "react";
import { Link } from "react-router-dom";  // ✅ Correct import
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Welcome = () => {
  return (
    <div className="welcome-page vh-100 d-flex align-items-center justify-content-center bg-light text-center">
      <Container>
        {/* Header Section */}
        <h1 className="fw-bold display-4 mb-2 text-danger">
          Blood Donation Management System
        </h1>
        <h2 className="mb-4 text-secondary">Donate Blood, Save Lives ❤️</h2>

        <p className="lead mb-5 text-muted">
          A platform that connects blood donors, recipients, and blood banks.
          Our mission is to make blood donation simpler, faster, and more
          accessible — ensuring that no life is lost due to a lack of available blood.
        </p>

        {/* Features Section */}
        <Row className="g-4 mb-5">
          {[
            {
              icon: "🩸",
              title: "Find Blood",
              desc: "Easily locate nearby blood banks or donors in emergencies.",
            },
            {
              icon: "❤️",
              title: "Donate Blood",
              desc: "Register as a donor and make a life-saving impact.",
            },
            {
              icon: "🏥",
              title: "Manage Blood Banks",
              desc: "Track blood availability and update inventory in real-time.",
            },
            {
              icon: "📊",
              title: "Donation Records",
              desc: "Keep a digital record of donations and requests securely.",
            },
          ].map((feature, idx) => (
            <Col key={idx} xs={12} md={6} lg={3}>
              <Card className="shadow-sm border-0 h-100">
                <Card.Body>
                  <div className="display-4 mb-3" style={{ fontSize: "3rem" }}>
                    {feature.icon}
                  </div>
                  <Card.Title className="fw-semibold text-danger">
                    {feature.title}
                  </Card.Title>
                  <Card.Text className="text-muted">{feature.desc}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Navigation Buttons */}
        <div className="d-flex justify-content-center gap-3">
          <Link to="/Home">
            <Button variant="danger" size="lg">
              Go to Home
            </Button>
          </Link>
          <Link to="/Login">
            <Button variant="outline-danger" size="lg">
              Login
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Welcome;
