const express = require("express");
const router = express.Router();
const controller = require("../Controller/classes");
const login = require("../MW/validation/loginValidation");
const { insertValidator, updateValidator } = require("../MW/validation/classValidation");
const validationResult = require("../MW/validation/validationResult");

/**
 * @swagger
 * /class:
 *   get:
 *     summary: Retrieve all classes
 *     description: Retrieve a list of all classes.
 *     responses:
 *       200:
 *         description: A list of classes.
 *   post:
 *     summary: Add a new class
 *     description: Add a new class to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: The unique identifier for the class.
 *               name:
 *                 type: string
 *                 description: The name of the class.
 *               supervisor:
 *                 type: string
 *                 description: The ID of the teacher supervising the class.
 *               children:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successfully added class.
 */

router
  .route("/class")
  .get(login.protect, controller.getClasses)
  .post(login.protect, insertValidator, validationResult, controller.addClass);

/**
 * @swagger
 * /class/{id}:
 *   get:
 *     summary: Retrieve a class by ID
 *     description: Retrieve a single class by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single class.
 *   patch:
 *     summary: Update a class by ID
 *     description: Update a single class by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Successfully updated class.
 *   delete:
 *     summary: Delete a class by ID
 *     description: Delete a single class by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted class.
 */

router
  .route("/class/:id")
  .get(controller.getClassById)
  .patch(updateValidator, validationResult, controller.updateClass)
  .delete(controller.deleteClass);

/**
 * @swagger
 * /class/teacher/{id}:
 *   get:
 *     summary: Retrieve all classes taught by a teacher
 *     description: Retrieve a list of all classes taught by a specific teacher.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the class.
 *                   name:
 *                     type: string
 *                     description: The name of the class.
 *                   supervisor:
 *                     type: string
 *                     description: The ID of the teacher supervising the class.
 *                   children:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of IDs of children attending the class.
 */

router
  .route("/class/teacher/:id")
  .get(controller.allClassSupervisors);

/**
 * @swagger
 * /class/child/{id}:
 *   get:
 *     summary: Retrieve all classes attended by a child
 *     description: Retrieve a list of all classes attended by a specific child.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of classes attended by the child.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier for the class.
 *                   name:
 *                     type: string
 *                     description: The name of the class.
 *                   supervisor:
 *                     type: string
 *                     description: The ID of the teacher supervising the class.
 *                   children:
 *                     type: array
 *                     items:
 *                       type: string
 *                     description: An array of IDs of children attending the class.
 */

router
    .route("/class/child/:id")
    .get(controller.getClassChild);

module.exports = router;
