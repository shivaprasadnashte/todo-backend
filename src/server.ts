import { Request, Response } from "express";
import express, { Express } from "express";
import connectDb from "./utills/db";
import userRoute from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();
app.use(express.json());
app.use(cors());
const PORT =process.env.PORT|| 3000;
connectDb();  
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api/users", userRoute);
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => console.log("Server running on port " + PORT));

