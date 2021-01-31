import "reflect-metadata";
import "./database/connection";
import express from "express";
import routes from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log(`🔥 Server is running on port: ${PORT}.`));
