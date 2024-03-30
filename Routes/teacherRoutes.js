const express = require("express");
const router = express.Router();
const controller = require("../Controller/teachers");

const {insertValidator, changePasswordValidation} = require("../MW/validation/teacherValidation");
const validationResult = require("../MW/validation/validationResult");
const isAuthorized = require("../MW/authenticationMW");

router
  .route("/teachers")
  .get(controller.getTeachers)
  .post(insertValidator, validationResult, controller.addTeacher);

router.route("/teachers/supervisors")
  .get(controller.allClassSupervisors);

router.route("/teachers/:id")
  .get(controller.getTeacherById)
  .patch(controller.updateTeacher)
  .delete(controller.deleteTeacher);

router.route('/teachers/changepassword/:id')
  .put(changePasswordValidation, controller.changeUserPass);

module.exports = router;