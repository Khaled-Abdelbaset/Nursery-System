const express = require("express");
const router = express.Router();
const controller = require("../Controller/childs");
const { insertValidator } = require("../MW/validation//childValidation");
const validationResult = require("..//MW/validation/validationResult");

router
  .route("/childs")
  .get(controller.getChilds)
  .post(controller.addChild);

  router.route("/childs/:id")
    .get(controller.getChildById)
    .patch(controller.updateChild)
    .delete(controller.deleteChild);

module.exports = router;