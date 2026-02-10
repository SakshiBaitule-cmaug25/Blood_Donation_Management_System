import express from 'express';
import cors from 'cors';
import { connectDb } from "./src/configs/DbConfig.js";
import { addUser, updateUser, getAllUsers, getUserById, userLogin } from './src/controllers/userController.js';
import { availableBlood } from './src/controllers/availabilityController.js';
import { getBloodBanks, addBank, getAllBanks, getBankById, updateBank,deleteBank } from './src/controllers/bloodBankController.js';
import { getDashboardData } from './src/controllers/dashboardData.js';
import { addDonor } from './src/controllers/donateController.js';
import { addReceiver, getReceiver } from './src/controllers/receiveController.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:2000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; connect-src 'self' http://localhost:2000");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(express.json());

/* ------------------ USER ------------------ */
app.post("/user", addUser);
app.get("/alluser", getAllUsers);
app.get("/user/:user_id", getUserById);
app.put("/update/:user_id", updateUser);
app.post("/login", userLogin);

/* ------------------ BLOOD BANK ------------------ */
app.post("/addBank", addBank);
app.get("/banks", getAllBanks);
app.get("/bank/:bank_id", getBankById);
app.put("/updateBank/:bank_id", updateBank);
app.get("/bloodbanks", getBloodBanks);
app.delete("/deleteBank/:bank_id", deleteBank);

/* ------------------ DASHBOARD ------------------ */
app.get("/dashboard", getDashboardData);

/* ------------------ DONOR & RECEIVER ------------------ */
app.post("/addDonor", addDonor);
app.post("/receive", addReceiver);
app.get("/getData",getReceiver);

/* ------------------ AVAILABILITY ------------------ */
app.get("/getavai/:type", availableBlood);

/* ------------------ SERVER ------------------ */
app.listen(2000, () => {
    console.log("✅ Server started at port 2000");
    connectDb();
});
