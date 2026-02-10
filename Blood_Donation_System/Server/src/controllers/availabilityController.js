// ...existing code...
import { getConnectionObject } from "../configs/DbConfig.js";

export const availableBlood = async (request, response) => {
    try {
        const connection = getConnectionObject(); // pool or connection
        const qry = `SELECT * FROM availability WHERE blood_type = ?`;
        const [rows] = await connection.query(qry, [request.params.type]);

        if (rows.length === 0) {
            response.status(404).send({ message: 'Not available' });
        } else {
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
// ...existing code...