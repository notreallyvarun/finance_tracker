import express, { Express } from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";

const app: Express = express();
const morgan = require("morgan")
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
const mongoURI: string =
  "mongodb://localhost:27017"

mongoose
  .connect(mongoURI,{dbName:'finance-db'})
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err) => console.error("Failed to Connect to MongoDB:", err));

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});