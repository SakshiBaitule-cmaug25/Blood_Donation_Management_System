import { compareSync, hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/DbConfig.js";
import jwt from "jsonwebtoken";

export async function addUser(request, response) {
    try {
        const connection = getConnectionObject();
        const { name, phone, email, city, state, user_password, type } = request.body;

        // Check if user already exists (by email or phone)
        const checkQuery = `SELECT * FROM user WHERE email = ? OR phone = ?`;
        const [existingUser] = await connection.query(checkQuery, [email, phone]);

        if (existingUser.length > 0) {
            return response.status(400).send({ message: 'User already exists. Please login instead.' });
        }

        const encryptedPassword = hashSync(user_password, 12);
        const qry = `INSERT INTO user(name, phone, email, city, state, user_password, type) 
                     VALUES(?, ?, ?, ?, ?, ?, ?)`;
        const [resultSet] = await connection.query(qry, [name, phone, email, city, state, encryptedPassword, type]);

        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Registration successful, now you can login' });
        }
        else {
            response.status(500).send({ message: 'User registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}


export async function userLogin(request, response) {
  try {
    const connection = getConnectionObject();
    const { email, user_password, type } = request.body; //  match frontend fields

    if (!email || !user_password || !type) {
      return response.status(400).send({ message: "Missing required fields" });
    }

    //  Find user with matching email & type
    const qry = `SELECT * FROM user WHERE email='${email}' AND type='${type}'`;
    const [rows] = await connection.query(qry);

    if (rows.length === 0) {
      return response.status(400).send({
        message: `No ${type} account found for this email.`,
      });
    }

    const user = rows[0];
    const isMatch = compareSync(user_password, user.user_password);

    if (!isMatch) {
      return response.status(400).send({ message: "Invalid password" });
    }

    //  Generate JWT Token
    const token = jwt.sign(
      { userId: user.user_id, role: user.type }, // <-- use correct field name user_id
      "itssecretkey",
      { expiresIn: "2h" }
    );

    // Include user_id in response
    response.status(200).send({
      message: `${type} login successful`,
      token,
      role: user.type,
      user_id: user.user_id, // 👈 crucial for frontend to use in DonateForm
    });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: "Something went wrong" });
  }
}


export async function updateUser(request,response){
try{
        const conn = getConnectionObject();
        const {name, phone, email, city, state, user_password,type} = request.body;
        const qry = `Update user SET  name='${name}', phone='${phone}', email='${email}',city='${city}',state='${state}', user_password='${user_password}',type='${type}' WHERE user_id =${request.params.user_id}`;
        const [result] = await conn.query(qry);
        if(result.affectedRows === 1){
            response.status(200).send({message: "user updated"});
        }else{
            response.status(500).send({ message:"user updation failed"});
        }
    }catch(error){
        console.log(error);
        response.status(500).send({ message: " Something went wrong" });
    }

}

export async function getAllUsers(request,response){
    try {
        const connection = getConnectionObject();
         const qry = `SELECT * FROM user`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}


export async function getUserById(request, response){
    try {
        const connection = getConnectionObject();
        const qry = `SELECT * FROM user WHERE user_id=${request.params.user_id}`;
        const [rows] = await connection.query(qry);
        if(rows.length === 0){
            response.status(404).send({message:'User not found'});
        }
        else{
            response.status(200).send(rows[0]);
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}