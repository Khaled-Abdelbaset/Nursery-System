const express = require("express");
const router = express.Router();
const controller = require("../Controller/teachers");
const validation = require("../MW/validation/teacherValidation");
const validationResult = require("../MW/validation/validationResult");
const upload = require("../Controller/photoController")
const login = require("../MW/validation/loginValidation")

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers
 *     description: Retrieve a list of all teachers.
 *     responses:
 *       200:
 *         description: A list of teachers.
 *   post:
 *     summary: Add a new teacher
 *     description: Add a new teacher to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the teacher.
 *               password:
 *                 type: string
 *                 description: The password of the teacher.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the teacher.
 *               image:
 *                 type: string
 *                 description: The image URL of the teacher.
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *                 description: The role of the teacher.
 *     responses:
 *       200:
 *         description: Successfully added teacher.
 */

router.route("/teachers")
  .get(login.protect, controller.getTeachers)
  .post(login.protect, upload.upload.single("image"), validation.insertValidator, validationResult, controller.addTeacher);

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Retrieve all class supervisors
 *     description: Retrieve a list of all class supervisors.
 *     responses:
 *       200:
 *         description: A list of class supervisors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The ID of the teacher supervisor.
 *                   fullName:
 *                     type: string
 *                     description: The full name of the teacher supervisor.
 *                   email:
 *                     type: string
 *                     format: email
 *                     description: The email address of the teacher supervisor.
 *                   image:
 *                     type: string
 *                     description: The image URL of the teacher supervisor.
 */

router.route("/teachers/supervisors")
  .get(controller.allClassSupervisors);

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Retrieve a teacher by ID
 *     description: Retrieve a single teacher by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single teacher.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the teacher.
 *                 fullName:
 *                   type: string
 *                   description: The full name of the teacher.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email address of the teacher.
 *                 image:
 *                   type: string
 *                   description: The image URL of the teacher.
 *                 role:
 *                   type: string
 *                   enum: [user, admin]
 *                   description: The role of the teacher.
 *       404:
 *         description: Teacher not found.
 *   patch:
 *     summary: Update a teacher by ID
 *     description: Update a single teacher by their ID.
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
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: Successfully updated teacher.
 *       404:
 *         description: Teacher not found.
 *   delete:
 *     summary: Delete a teacher by ID
 *     description: Delete a single teacher by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted teacher.
 *       404:
 *         description: Teacher not found.
 */

router.route("/teachers/:id")
  .get(controller.getTeacherById)
  .patch(upload.upload.single("image"), validation.updateValidator, validationResult, controller.updateTeacher)
  .delete(validation.deleteValidator, validationResult, controller.deleteTeacher);

/**
 * @swagger
 * /teachers/changepassword/{id}:
 *   patch:
 *     summary: Change password for a user
 *     description: Change the password for a user by their ID.
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
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: The current password of the user.
 *               newPassword:
 *                 type: string
 *                 description: The new password to be set for the user.
 *     responses:
 *       200:
 *         description: Successfully changed password.
 *       400:
 *         description: Invalid request body or password change failed.
 *       404:
 *         description: User not found.
 */

router.route('/teachers/changepassword/:id')
  .patch(validation.changePassword, validationResult, controller.changeUserPass);

module.exports = router;