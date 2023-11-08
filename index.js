import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.use("/images", express.static("images"));

app.get("/", (request, response) => {
  response.json(data);
});

app.get(
  "/next",
  (request, response, next) => {
    console.log("The response will be sent by next function");
    next();
  },
  (request, response) => {
    response.send("I just set up a route with a second callback");
  }
);

app.get("/class/:id", (request, response) => {
  const studentId = Number(request.params.id);
  const student = data.filter((student) => student.id === studentId);
  response.send(student);
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
});
