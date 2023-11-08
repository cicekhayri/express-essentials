import express from "express";
import data from "./data/mock.json" assert { type: "json" };

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.use("/images", express.static("images"));

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.json(data);
});

app.post("/item", (request, response) => {
  console.log(request.body);
  response.send(request.body);
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

app.get("/download", (request, response) => {
  response.download("images/mountains_2.jpeg");
});

app.get("/redirect", (request, response) => {
  response.redirect("https://www.linkedin.com");
});

app
  .route("/class")
  .get((request, response) => {
    response.send("Retrieve class info");
  })
  .post((request, response) => {
    response.send("Create class info");
  })
  .put((request, response) => {
    response.send("Update class info");
  });

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
