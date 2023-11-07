import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

app.get("/", (request, response) => {
  response.json(data);
});

app.post("/create", (request, response) => {
  response.send("This is a POST request at /create");
});

app.put("/edit", (request, response) => {
  response.send("This is a PUT request at /edit");
});

app.delete("/delete", (request, response) => {
  response.send("This is a DELETE request at /delete");
});

app.listen(PORT, () => {
  console.log(`The server is running on ${PORT}!`);
  console.log(data);
});
