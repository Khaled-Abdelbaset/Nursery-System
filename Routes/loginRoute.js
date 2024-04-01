const express = require("express");
const router = express.Router();
const {loginValidator} = require("../MW/validation/loginValidation");
const {login} = require('../Controller/loginController');
const validationResult = require("../MW/validation/validationResult");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate and login a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User authenticated and logged in successfully.
 *       400:
 *         description: Invalid request payload or missing required fields.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 */
router
  .route("/login")
  .post(loginValidator, validationResult, login);

module.exports = router;
