import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send("Unauthorized");
  }

  const data = jwt.verify(authHeader, process.env.JWT_SECRET);

  if (!data) {
    return res.status(401).send("Unauthorized");
  }
  console.log(data);
  req.user = data;
  next();
};

export default auth;
