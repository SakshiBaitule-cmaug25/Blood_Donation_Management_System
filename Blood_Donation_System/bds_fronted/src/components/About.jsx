import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export function About() {
  const teamMembers = [
    {
      name: "Niket Malviya",
      prn: "250840320112",
      image: "/src/assets/images/Niket.jpg",
    },
    {
      name: "Sakshi Baitule",
      prn: "250840320164",
      image: "/src/assets/images/Sakshi.jpg",
    },
    {
      name: "Siddhi Adkitte",
      prn: "250840320198",
      image: "/src/assets/images/Siddhi.jpg",
    },
  ];

  return (
    <Container style={{ padding: "40px", fontFamily: "Verdana, sans-serif" }}>
      <h1 className="text-center text-danger mb-4">About Us</h1>

      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        <strong>Blood Donation Management System</strong> is a web-based platform
        designed to connect blood donors, recipients, and blood banks efficiently.
        Our goal is to make blood donation simpler, faster, and more accessible —
        ensuring that no life is lost due to a lack of available blood.
      </p>

      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        This system allows users to register as donors, request blood, manage blood
        bank availability, and maintain donation records — all in one centralized platform.
      </p>

      <h2 className="text-danger mt-5">Our Vision</h2>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        To build a future where every blood requirement is fulfilled on time through
        technology-driven solutions that promote awareness, responsibility, and compassion.
      </p>

      <h2 className="text-danger mt-5">Our Mission</h2>
      <p style={{ fontSize: "18px", lineHeight: "1.6" }}>
        To create a reliable and transparent digital network that helps connect those
        in need of blood with donors and blood banks in real-time.
      </p>

      <h2 className="text-danger mt-5 text-center mb-4">Our Team</h2>
      <Row className="justify-content-center g-4">
        {teamMembers.map((member, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <Card className="text-center shadow-sm">
              <Card.Img
                variant="top"
                src={member.image}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  margin: "20px auto 10px",
                }}
              />
              <Card.Body>
                <Card.Title className="text-danger">{member.name}</Card.Title>
                <Card.Text style={{ fontSize: "16px", color: "#555" }}>
                  PRN: {member.prn}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
