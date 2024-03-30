const express = require("express");
const { default: mongoose } = require('mongoose');

const authenticationMW = require("./MW/authenticationMW");
const login = require("./Routes/authentication")

const teacherRoutes = require("./Routes/teacherRoutes");
const childRoutes = require("./Routes/childRoutes");
const classRoutes = require("./Routes/classRoutes");
const server = express();

const port = process.env.PORT || 8080;
mongoose
    .connect("mongodb://127.0.0.1:/ITISystem")
    .then(() => {
        console.log("DB Connected....");
        server.listen(port, () => {
        console.log("listening on Port : ",port);
        });
    })
    .catch((error) => {
        console.log("Error" + error);
});

server.use((request, response, next) => {
  console.log(request.url, request.method);
  next();
});

server.use(express.json());
// server.use(authenticationMW);
server.use(login);

server.use(teacherRoutes);
server.use(childRoutes);
server.use(classRoutes);

server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});

