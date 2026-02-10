// ...existing code...
import { getConnectionObject } from "../configs/DbConfig.js";

export async function addDonor(req, res) {
  try {
    const { user_id, blood_type, donation_date, bank_id } = req.body;

    if (!blood_type || !donation_date || !bank_id) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const connection = getConnectionObject();

    // Step 1: Insert donation
    const insertQuery = `
      INSERT INTO donate (donation_date, user_id, bank_id, blood_type)
      VALUES (?, ?, ?, ?)
    `;
    await connection.query(insertQuery, [donation_date, user_id, bank_id, blood_type]);

    // Step 2: Check if blood type exists in availability
    const [existingRows] = await connection.query(
      `SELECT * FROM availability WHERE bank_id = ? AND blood_type = ?`,
      [bank_id, blood_type]
    );

    if (existingRows.length > 0) {
      // Step 3: Update quantity if exists
      await connection.query(
        `UPDATE availability 
         SET available_units = available_units + 1, last_updated = CURDATE()
         WHERE bank_id = ? AND blood_type = ?`,
        [bank_id, blood_type]
      );
    } else {
      // Step 4: Insert new availability entry if not exists
      await connection.query(
        `INSERT INTO availability (bank_id, blood_type, available_units, last_updated)
         VALUES (?, ?, 1, CURDATE())`,
        [bank_id, blood_type]
      );
    }

    res.status(200).send({ message: "Donation added and availability updated successfully!" });
  } catch (error) {
    console.error("Error in addDonor:", error);
    res.status(500).send({ message: "Something went wrong while adding donation." });
  }
}


export async function getDonor(request,response){
    let connection;
    try {
        connection = getConnectionObject();
         const qry = "SELECT * FROM donate";
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    } finally {
        if (connection && typeof connection.end === "function") {
            await connection.end();
        }
    }
}
// ...existing code...