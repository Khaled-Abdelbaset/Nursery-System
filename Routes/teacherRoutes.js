const express = require("express");
const router = express.Router();
const controller = require("../Controller/teachers");
const validation = require("../MW/validation/teacherValidation");
const validationResult = require("../MW/validation/validationResult");
const isAuthorized = require("../MW/authenticationMW");
const {uploadTeacherImage} = require('../Controller/teachers');

router
  .route("/teachers")
  .get(controller.getTeachers)
  .post(validation.insertValidator, validationResult, uploadTeacherImage, controller.addTeacher);

router.route("/teachers/supervisors")
  .get(controller.allClassSupervisors);

router.route("/teachers/:id")
  .get(controller.getTeacherById)
  .patch(uploadTeacherImage, controller.updateTeacher)
  .delete(controller.deleteTeacher);

router.route('/teachers/changepassword/:id')
  .patch(validation.changePassword, validationResult, controller.changeUserPass);

module.exports = router;