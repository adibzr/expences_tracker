import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import routes from "../routes";

const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cookieParser());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(
//   fileUpload({
//     limits: { fileSize: 50 * 1024 * 1024 },
//     useTempFiles: true,
//     tempFileDir: "/uploads/",
//     createParentPath: true,
//   })
// );

app.use(morgan("dev"));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "*"
    //"GET, POST, OPTIONS, PUT, DELETE,PATCH"
  );
  next();
});

app.use(cors());
//route config
app.use("/", routes);

app.use((err: any, _req: any, res: any, _next: any) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});

export default app;
