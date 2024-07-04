import cors from "cors";
import express, { Application, Request, Response } from "express";
const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  var a = 10;
  res.send(a);
});

export default app;

// console.log(process.cwd());
