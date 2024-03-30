
const express = require("express");
const router = express.Router();
const controller = require("../Controller/classes");
const {insertValidator, updateValidator} = require("../MW/validation/classValidation")
const validationResult = require("../MW/validation/validationResult")
router
    .route("/class")
    .get(controller.getClasses)
    .post(insertValidator, validationResult, controller.addClass)

router
    .route("/class/:id")
        .get(controller.getClassById)
        .patch(updateValidator, validationResult, controller.updateClass)
        .delete(controller.deleteClass);  
    
router
    .route("/class/teacher/:id")
    .get(controller.allClassSupervisors);

router
    .route("/class/child/:id")
    .get(controller.getClassChild);

module.exports = router;