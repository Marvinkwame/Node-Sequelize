import express from "express";
import { PostgresConnection } from "./postgres/postgres.js";
import userRoutes from "./routes/useRoutes.js";
import cors from "cors";

const app = express();

PostgresConnection();

app.use(express.json())
app.use(cors())

app.use("/api/workers", userRoutes);

app.listen(5000, () => {
  console.log("Connected to port localhost:5000");
});
