import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./lib/utils.js";
import { getAllFiles } from "./lib/file.js";
const app = express();
app.use(cors());
app.use(express.json());
app.listen(3000, () => {
  console.log("Server on port", 3000);
});

// POSTMAN
app.post("/deploy", async (req, res) => {
  const repoUrl = req.body.repoUrl;
  const id = generate(); // asd12
  await simpleGit().clone(repoUrl, `output/${id}`);
  const files = getAllFiles(`output/${id}`);

  res.json({
    id: id,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
