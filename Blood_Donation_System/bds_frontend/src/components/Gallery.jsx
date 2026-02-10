import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

// Sample image imports (store your images in /public/images/gallery/)
const galleryImages = [
  { src: "/src/assets/Gallery/drive1.jpg", title: "Blood Donation Drive 1" },
  { src: "/src/assets/Gallery/drive2.jpg", title: "Blood Donation Drive 2" },
  { src: "/src/assets/Gallery/drive3.jpg", title: "Blood Donation Drive 3" },
  { src: "/src/assets/Gallery/drive4.jpg", title: "Blood Donation Drive 4" },
  { src: "/src/assets/Gallery/drive5.jpg", title: "Blood Donation Drive 5" },
  { src: "/src/assets/Gallery/drive6.jpg", title: "Blood Donation Drive 6" },
];

export function Gallery() {
  return (
    <Container style={{ padding: "40px 0" }}>
      <h2 className="text-center text-danger mb-5">Blood Donation Drives</h2>
      <Row xs={1} sm={2} md={3} lg={3} className="g-4">
        {galleryImages.map((img, index) => (
          <Col key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={img.src}
                alt={img.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title className="text-center">{img.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
