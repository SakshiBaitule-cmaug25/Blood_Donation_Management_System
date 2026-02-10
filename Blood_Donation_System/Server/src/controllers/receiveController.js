import { getConnectionObject } from "../configs/DbConfig.js";


export async function addReceiver(req, res) {
  try {
    const { receive_date, user_name, bank_id, blood_type } = req.body;

    if (!receive_date || !user_name || !bank_id || !blood_type) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const connection = getConnectionObject();

    // Step 1: Check availability first
    const [rows] = await connection.query(
      `SELECT available_units FROM availability WHERE bank_id = ? AND blood_type = ?`,
      [bank_id, blood_type]
    );

    if (rows.length === 0) {
      return res.status(404).send({
        message: "This blood type does not exist in this blood bank.",
      });
    }

    const currentUnits = rows[0].available_units;

    if (currentUnits <= 0) {
      return res.status(400).send({
        message: "This blood type is currently out of stock in this blood bank.",
      });
    }

    // Step 2: Insert into receive table
    const insertQuery = `
      INSERT INTO receive (receive_date, user_name, bank_id, blood_type)
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(insertQuery, [receive_date, user_name, bank_id, blood_type]);

    // Step 3: Decrease available units by 1
    await connection.query(
      `UPDATE availability 
       SET available_units = available_units - 1, last_updated = CURDATE()
       WHERE bank_id = ? AND blood_type = ?`,
      [bank_id, blood_type]
    );

    res
      .status(200)
      .send({ message: "Receiver added and availability updated successfully!" });
  } catch (error) {
    console.error("Error in addReceiver:", error);
    res.status(500).send({ message: "Server error while adding receiver." });
  }
}


export async function getReceiver(req, res) {
  try {
    const connection = getConnectionObject(); // ✅ FIXED: get connection first

    const query = `
      SELECT 
        r.receive_id,
        r.receive_date,
        r.user_name,
        r.blood_type,
        b.name AS bank_name,
        b.city,
        b.state
      FROM receive r
      JOIN blood_bank b ON r.bank_id = b.bank_id
      ORDER BY r.receive_id DESC;
    `;

    const [rows] = await connection.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching receive data:", error);
    res.status(500).json({ message: "Failed to fetch receive data." });
  }
}
