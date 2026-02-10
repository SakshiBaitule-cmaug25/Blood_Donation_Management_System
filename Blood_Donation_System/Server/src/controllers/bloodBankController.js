import { getConnectionObject } from "../configs/DbConfig.js";

export async function addBank(request, response) {
  try {
    const conn = getConnectionObject();
    const { name, address, city, state, phone } = request.body;
    const qry = `
      INSERT INTO Blood_bank (name, address, city, state, phone)
      VALUES ('${name}', '${address}', '${city}', '${state}', '${phone}')
    `;
    const [result] = await conn.query(qry);
    response.status(200).send({ message: "Blood bank added successfully" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function getAllBanks(req, res) {
  try {
    const conn = await getConnectionObject();
    const [rows] = await conn.query(
      "SELECT bank_id, name, address, city, state, phone FROM Blood_bank"
    );
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
}

export async function getBankById(req, res) {
  try {
    const connection = getConnectionObject();
    const qry = `
      SELECT bank_id, name, address, city, state, phone
      FROM Blood_bank
      WHERE bank_id = ${req.params.bank_id}
    `;
    const [rows] = await connection.query(qry);

    if (rows.length === 0) {
      return res.status(404).send({ message: "Blood Bank not found" });
    }

    res.status(200).send(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
}

export async function updateBank(request, response) {
  try {
    const conn = getConnectionObject();
    const { name, address, city, state, phone } = request.body;
    const qry = `
      UPDATE Blood_bank 
      SET name='${name}', address='${address}', city='${city}', state='${state}', phone='${phone}' 
      WHERE bank_id = ${request.params.bank_id}
    `;
    const [result] = await conn.query(qry);

    if (result.affectedRows === 1) {
      response.status(200).send({ message: "Bank updated" });
    } else {
      response.status(500).send({ message: "Bank updation failed" });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function getBloodBanks(req, res) {
  try {
    const { city, state } = req.query;
    const connection = await getConnectionObject();

    let query = `
      SELECT 
        b.bank_id, b.name, b.address, b.city, b.state, b.phone,
        GROUP_CONCAT(a.blood_type SEPARATOR ', ') AS available_types
      FROM Blood_bank b
      LEFT JOIN availability a ON b.bank_id = a.bank_id
      WHERE 1=1
    `;

    const params = [];

    if (state) {
      query += " AND b.state = ?";
      params.push(state);
    }
    if (city) {
      query += " AND b.city = ?";
      params.push(city);
    }

    query += " GROUP BY b.bank_id;";

    const [rows] = await connection.query(query, params);
    res.status(200).json(rows);
  } catch (err) {
    console.error("❌ Error fetching blood banks:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
}


export async function deleteBank(req, res) {
  try {
    const conn = await getConnectionObject();
    const qry = `DELETE FROM Blood_bank WHERE bank_id = ${req.params.bank_id}`;
    const [result] = await conn.query(qry);

    if (result.affectedRows === 1) {
      res.status(200).send({ message: "Bank deleted successfully" });
    } else {
      res.status(404).send({ message: "Bank not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong" });
  }
}