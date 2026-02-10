import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { receiveBlood } from "../services/LoginServices";
import { toast } from "react-toastify";

export function Receiver({ show, handleClose, bloodType, bankId, onReceiveSuccess }) {
  const [receiverName, setReceiverName] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Automatically set current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().split("T")[0];

    const response = await receiveBlood({
      receive_date: currentDate, // <-- automatically added
      user_name: receiverName,
      blood_type: bloodType,
      bank_id: bankId,
    });

    toast.success("✅ Blood received successfully!", {
      position: "top-center",
      autoClose: 2000,
    });

    setReceiverName("");
    handleClose();

    if (onReceiveSuccess) onReceiveSuccess(); // Refresh after success
  } catch (error) {
    toast.error("❌ Failed to process blood request!", {
      position: "top-center",
    });
    console.error(error);
  }
};

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Blood Receiver Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              value={receiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            variant="danger"
            className="mt-3 w-100"
          >
            Submit Request
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
