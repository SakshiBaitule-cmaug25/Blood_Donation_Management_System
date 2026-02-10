import { getConnectionObject } from "../configs/DbConfig.js";

export const getDashboardData = async (req, res) => {
  const db = getConnectionObject();
  try {
    const pieChartQuery = `
      SELECT blood_type AS name, SUM(available_units) AS units
      FROM availability
      GROUP BY blood_type
    `;

    const barChartQuery = `
      SELECT city, SUM(a.available_units) AS available_units
      FROM blood_bank b
      JOIN availability a ON b.bank_id = a.bank_id
      GROUP BY city
    `;

    const bloodBanksQuery = `
      SELECT 
        b.bank_id, b.name, b.address, b.city, b.state, b.phone,
        GROUP_CONCAT(a.blood_type ORDER BY a.blood_type SEPARATOR ', ') AS available_types
      FROM blood_bank b
      LEFT JOIN availability a ON b.bank_id = a.bank_id
      GROUP BY b.bank_id
    `;

    // Run all queries in parallel
    const [pieData, barData, banks] = await Promise.all([
      db.query(pieChartQuery),
      db.query(barChartQuery),
      db.query(bloodBanksQuery)
    ]);

    const dashboardData = {
      pieChartData: pieData[0],
      barChartData: barData[0],
      bloodBanks: banks[0],
    };

    res.status(200).json(dashboardData);
  } catch (err) {
    console.error("❌ Error fetching dashboard data:", err);
    res.status(500).json({ 
      message: "Error fetching dashboard data", 
      error: err.message 
    });
  }
};
