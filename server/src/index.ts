import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response, Application } from "express";

import appRouter from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./misc/logger";

dotenv.config();

const app: Application = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("API is running....");
});

app.use(appRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.clear();
  logger.info(`Server is running on port ${PORT}`);
});
