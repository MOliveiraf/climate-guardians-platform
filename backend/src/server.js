import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.routes.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});