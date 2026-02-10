import { createConnection } from "mysql2/promise";

let connection = null;

export async function connectDb() {
  try {
    connection = await createConnection({
      host: "localhost",
      port: 3306,
      user: "root",
      password: "cdac",
      database: "BDMS_final",
    });
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

export function getConnectionObject() {
  return connection;
}
