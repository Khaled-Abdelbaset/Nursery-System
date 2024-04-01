const express = require("express");
const router = express.Router();
const controller = require("../Controller/childs");
const validation = require("../MW/validation/childValidation");
const validationResult = require("../MW/validation/validationResult");
const upload = require("../Controller/photoController");
const login = require("../MW/validation/loginValidation");

/**
 * @swagger
 * /childs:
 *   get:
 *     summary: Retrieve all children
 *     description: Retrieve a list of all children.
 *     responses:
 *       200:
 *         description: A list of children.
 *   post:
 *     summary: Add a new child
 *     description: Add a new child to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *                 description: The full name of the child.
 *               age:
 *                 type: number
 *                 description: The age of the child.
 *               level:
 *                 type: string
 *                 enum: ["KG1", "KG2"]
 *                 description: The level of the child (KG1 or KG2).
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     description: The city where the child resides.
 *                   street:
 *                     type: string
 *                     description: The street where the child resides.
 *                   building:
 *                     type: string
 *                     description: The building where the child resides.
 *     responses:
 *       200:
 *         description: Successfully added child.
 */

router.route("/childs")
  .get(login.protect, controller.getChilds)
  .post(login.protect, upload.upload.single("image"), validation.insertValidator, validationResult, controller.addChild);

/**
 * @swagger
 * /childs/{id}:
 *   get:
 *     summary: Retrieve a child by ID
 *     description: Retrieve a single child by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single child.
 *   patch:
 *     summary: Update a child by ID
 *     description: Update a single child by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               fullName:
 *                 type: string
 *                 description: The updated full name of the child.
 *               age:
 *                 type: number
 *                 description: The updated age of the child.
 *               level:
 *                 type: string
 *                 enum: ["KG1", "KG2"]
 *                 description: The updated level of the child (KG1 or KG2).
 *               address:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                     description: The updated city where the child resides.
 *                   street:
 *                     type: string
 *                     description: The updated street where the child resides.
 *                   building:
 *                     type: string
 *                     description: The updated building where the child resides.
 *     responses:
 *       200:
 *         description: Successfully updated child.
 *   delete:
 *     summary: Delete a child by ID
 *     description: Delete a single child by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted child.
 */

router.route("/childs/:id")
  .get(controller.getChildById)
  .patch(upload.upload.single("image"), validation.updateValidator, validationResult, controller.updateChild)
  .delete(controller.deleteChild);

module.exports = router;
