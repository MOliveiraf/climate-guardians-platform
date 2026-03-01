import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import actionRoutes from "./routes/action.routes.js";
import studentActionRoutes from "./routes/studentAction.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/actions", actionRoutes);
app.use("/student-actions", studentActionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});