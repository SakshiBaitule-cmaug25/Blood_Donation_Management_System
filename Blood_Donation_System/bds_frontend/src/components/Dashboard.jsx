
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Table from "react-bootstrap/Table";
// import Container from "react-bootstrap/Container";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
// } from "recharts";
// import { removeToken } from "../services/TokenServices";
// import { removeRole } from "../services/RoleServices";
// import { getDashboardData } from "../services/LoginServices";

// const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0", "#FF9800"];

// export function Dashboard() {
//   const navigate = useNavigate();

//   const [pieData, setPieData] = useState([]);
//   const [barData, setBarData] = useState([]);
//   const [bloodBanks, setBloodBanks] = useState([]);

 
//   useEffect(() => {
//   getDashboardData()
//     .then((res) => {
//       const pie = res.data.pieChartData.map((item) => ({
//         ...item,
//         units: Number(item.units), // Convert string to number
//       }));

//       setPieData(pie);
//       setBarData(res.data.barChartData || []);
//       setBloodBanks(res.data.bloodBanks || []);
//     })
//     .catch((err) => console.error("Error fetching dashboard data:", err));
// }, []);

//   const handleLogout = () => {
//     removeToken();
//     removeRole();
//     navigate("/Login");
//   };

//   return (
//     <Container className="text-center mt-5">
//       <h1 className="fw-bold mb-4">Dashboard</h1>

//       {/* 🔴 Logout Button
//       <Button variant="danger" onClick={handleLogout} className="mb-5">
//         Logout
//       </Button> */}

//       {/* 📊 Charts Section */}
//       <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5 mb-5">
//         {/* 🩸 Pie Chart */}
//         <div style={{ width: 350, height: 350 }}>
//           <h4>Blood Type Distribution</h4>
//           <ResponsiveContainer>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 fill="#8884d8"
//                 dataKey="units"
//                 nameKey="name"
//                 label={({ name, units }) => `${name}: ${units}`}
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* 🏙️ Bar Chart */}
//         <div style={{ width: 600, height: 400 }}>
//           <h4>City-wise Blood Availability</h4>
//           <ResponsiveContainer>
//             <BarChart
//               data={barData}
//               margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="city" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="available_units" fill="#36A2EB" name="Available Units" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* 🏥 Blood Bank Table */}
//       <div className="mt-5 mb-5">
//         <h3 className="fw-bold mb-3 text-center">Available Blood Banks</h3>
//         <Table striped bordered hover responsive className="shadow-sm">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Blood Bank Name</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Contact</th>
//               <th>Address</th>
//               <th>Available Types</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bloodBanks.length > 0 ? (
//               bloodBanks.map((bank, index) => (
//                 <tr key={bank.bank_id}>
//                   <td>{index + 1}</td>
//                   <td>{bank.name}</td>
//                   <td>{bank.city}</td>
//                   <td>{bank.state}</td>
//                   <td>{bank.phone}</td>
//                   <td>{bank.address}</td>
//                   <td>{bank.available_types}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">
//                   No data available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </Table>
//       </div>
//     </Container>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { toast, Slide } from "react-toastify";
import { statesAndCities } from "../data/statesAndCities";
import { removeToken } from "../services/TokenServices";
import { removeRole } from "../services/RoleServices";
import {
  getDashboardData,
  addBloodBank,
  updateBloodBank,
  deleteBloodBank,
  getReceiverData,
} from "../services/LoginServices";

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4CAF50",
  "#9C27B0",
  "#FF9800",
];

export function Dashboard() {
  const navigate = useNavigate();

  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [bloodBanks, setBloodBanks] = useState([]);
  const [receivers, setReceivers] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [editingBank, setEditingBank] = useState(null);
  const [selectedBank, setSelectedBank] = useState({
    name: "",
    address: "",
    state: "",
    city: "",
    phone: "",
    available_types: "",
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // ✅ Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      const res = await getDashboardData();

      const pie = (res.data.pieChartData || []).map((item) => ({
        ...item,
        units: Number(item.units),
      }));

      setPieData(pie);
      setBarData(res.data.barChartData || []);
      setBloodBanks(res.data.bloodBanks || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // ✅ Fetch receiver data
  const fetchReceiverData = async () => {
    try {
      const res = await getReceiverData();
      setReceivers(res.data || []);
    } catch (error) {
      console.error("Error fetching receiver data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchReceiverData();
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    removeToken();
    removeRole();
    navigate("/Login");
  };

  // ✅ Add / Update Bank
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedBank.state || !selectedBank.city) {
      toast.error("Please select both state and city.", { transition: Slide });
      return;
    }

    try {
      if (editingBank) {
        await updateBloodBank(editingBank.bank_id, selectedBank);
        toast.success("Blood bank updated successfully!", { transition: Slide });
      } else {
        await addBloodBank(selectedBank);
        toast.success("Blood bank added successfully!", { transition: Slide });
      }

      handleClose();
      setEditingBank(null);
      setSelectedBank({
        name: "",
        address: "",
        state: "",
        city: "",
        phone: "",
        available_types: "",
      });
      fetchDashboardData();
    } catch (error) {
      console.error("Error saving bank:", error);
      toast.error("Something went wrong!", { transition: Slide });
    }
  };

  // ✅ Edit Bank
  const handleEdit = (bank) => {
    setEditingBank(bank);
    setSelectedBank(bank);
    handleShow();
  };

  // ✅ Delete Bank
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blood bank?")) {
      try {
        await deleteBloodBank(id);
        toast.success("Blood bank deleted successfully!", { transition: Slide });
        fetchDashboardData();
      } catch (error) {
        console.error("Error deleting bank:", error);
        toast.error("Failed to delete bank!", { transition: Slide });
      }
    }
  };

  return (
    <Container className="text-center mt-5">
      <div className="d-flex justify-content-center align-items-center mb-4">
  <h1 className="fw-bold">Dashboard</h1>
</div>

      {/* 📊 Charts Section */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-5 mb-5">
        {/* 🩸 Pie Chart */}
        <div style={{ width: 350, height: 350 }}>
          <h4>Blood Type Distribution</h4>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="units"
                nameKey="name"
                label={({ name, units }) => `${name}: ${units}`}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 🏙️ Bar Chart */}
        <div style={{ width: 600, height: 400 }}>
          <h4>City-wise Blood Availability</h4>
          <ResponsiveContainer>
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="available_units"
                fill="#36A2EB"
                name="Available Units"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🏥 Blood Bank Table */}
      <div className="mt-5 mb-5 text-start">
  <div className="d-flex justify-content-between align-items-center mb-3">
     {/* placeholder for left side */}
    <h3 className="fw-bold" style={{ marginLeft: "510px" }}>
  Available Blood Banks
   </h3>
          <Button
            variant="danger"
            onClick={() => {
              setEditingBank(null);
              setSelectedBank({
                name: "",
                address: "",
                state: "",
                city: "",
                phone: "",
                available_types: "",
              });
              handleShow();
            }}
          >
            + Add Blood Bank
          </Button>
        </div>

        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>City</th>
              <th>State</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Available Types</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bloodBanks.length > 0 ? (
              bloodBanks.map((bank, index) => (
                <tr key={bank.bank_id}>
                  <td>{index + 1}</td>
                  <td>{bank.name}</td>
                  <td>{bank.city}</td>
                  <td>{bank.state}</td>
                  <td>{bank.phone}</td>
                  <td>{bank.address}</td>
                  <td>{bank.available_types}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => handleEdit(bank)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(bank.bank_id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* 🧾 Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingBank ? "Edit Blood Bank" : "Add Blood Bank"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={selectedBank.name}
                onChange={(e) =>
                  setSelectedBank({ ...selectedBank, name: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={selectedBank.address}
                onChange={(e) =>
                  setSelectedBank({ ...selectedBank, address: e.target.value })
                }
                required
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    value={selectedBank.state}
                    onChange={(e) => {
                      const state = e.target.value;
                      setSelectedBank({ ...selectedBank, state, city: "" });
                    }}
                    required
                  >
                    <option value="">Select State</option>
                    {Object.keys(statesAndCities).map((stateName) => (
                      <option key={stateName} value={stateName}>
                        {stateName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Select
                    value={selectedBank.city}
                    onChange={(e) =>
                      setSelectedBank({
                        ...selectedBank,
                        city: e.target.value,
                      })
                    }
                    disabled={!selectedBank.state}
                    required
                  >
                    <option value="">Select City</option>
                    {selectedBank.state &&
                      statesAndCities[selectedBank.state].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={selectedBank.phone}
                onChange={(e) =>
                  setSelectedBank({ ...selectedBank, phone: e.target.value })
                }
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="danger" type="submit">
                {editingBank ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* ⚡ Receiver Table */}
      <div className="mt-5 mb-5 text-start">
        <h3 className="fw-bold text-center mb-3">Receiver Records</h3>

        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Receiver Name</th>
              <th>Blood Type</th>
              <th>Receive Date</th>
              <th>Bank Name</th>
              <th>City</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {receivers.length > 0 ? (
              receivers.map((rec, index) => (
                <tr key={rec.receive_id}>
                  <td>{index + 1}</td>
                  <td>{rec.user_name}</td>
                  <td>{rec.blood_type}</td>
                  <td>{rec.receive_date}</td>
                  <td>{rec.bank_name}</td>
                  <td>{rec.city}</td>
                  <td>{rec.state}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No receiver data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

