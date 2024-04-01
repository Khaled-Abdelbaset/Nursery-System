const express = require("express");
const { default: mongoose } = require('mongoose');
const loginRoute = require("./Routes/loginRoute");

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');

require('dotenv').config()

const teacherRoutes = require("./Routes/teacherRoutes");
const childRoutes = require("./Routes/childRoutes");
const classRoutes = require("./Routes/classRoutes");
const server = express();

const port = process.env.PORT || 8080;
mongoose.connect("mongodb://127.0.0.1:/ITISystem")
  .then(() => {
    console.log("DB Connected....");
    server.listen(port, () => {
    console.log("listening on Port : ", port);
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

const options = {
  definition: {
    openapi: '3.0.0',
    servers: [
      { url: process.env.LOCAL_URL }
    ],
    info: {
      title: 'NurserySystem Project Docs', 
      version: '1.0.0',
      description:
      ""
    },

  },
  apis: ['./Routes/*.js'],
};

server.use(teacherRoutes);
server.use(childRoutes);
server.use(classRoutes);
server.use(loginRoute);
const swagerSpec = swaggerJSDoc(options);
server.use('/api-docs', swaggerUiExpress.serve,swaggerUiExpress.setup(swagerSpec));

server.use((request, response) => {
  response.status(404).json({ data: "Not Found" });
});

server.use((error, request, response, next) => {
  response.status(500).json({ data: `Error MW ${error}` });
});