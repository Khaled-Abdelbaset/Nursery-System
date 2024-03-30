const express = require("express");
const router = express.Router();
const controller = require("../Controller/childs");
const { insertValidator } = require("../MW/validation/childValidation");
const validationResult = require("../MW/validation/validationResult");
const {uploadChildImage} = require('../Controller/childs')

router
  .route("/childs")
  .get(controller.getChilds)
  .post(uploadChildImage, controller.addChild);

router.route("/childs/:id")
  .get(controller.getChildById)
  .patch(uploadChildImage, controller.updateChild)
  .delete(controller.deleteChild);

module.exports = router;