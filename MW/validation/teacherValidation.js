const { body, param, query } = require("express-validator");
const classSchema = require("../../Model/classModel");

exports.insertValidator = [
  body("_id")
  .isMongoId()
  .withMessage("Teacher Id Should Be Mongo Id"),

  body("fullName")
  .isAlpha()
  .withMessage("Teacher Name Should Be String")
  .isLength({ min: 5 })
  .withMessage("Teacher Name Length Must Be > 5"),

  body("password")
  .isStrongPassword()
  .withMessage("Password Must Be Strong"),

  body("email")
  .isEmail()
  .withMessage("Email Is Not Valid")
  ];

exports.updateValidator = [
  body("_id")
  .optional()
  .isMongoId()
  .withMessage("Teacher Id Should Be Mongo Id"),

  body("fullName")
  .optional()
  .isAlpha()
  .withMessage("Teacher Name Should Be String")
  .isLength({ min: 5 })
  .withMessage(" Teacher Name Length Must Be > 5"),

  body("password")
  .isStrongPassword()
  .withMessage("Password Must Be Strong"),

  body("email")
  .isEmail()
  .withMessage("Email Is Not Valid")
];

exports.deleteValidation = [
    param("_id")
    .isMongoId()
    .withMessage("Teacher Id Should Be Mongo Id")
    .custom(async (_id) => {
        const teacherSupervise = await classSchema.countDocuments({ supervisor: _id });
        console.log(teacherSupervise + "1")
        if (teacherSupervise) {
            console.log(teacherSupervise)
            throw new Error("Teacher Is A Supervisor, Can't Be Deleted");
        }
    })
];

exports.changePassword = [
  body("password")
  .isStrongPassword()
  .withMessage("Password Must Be Strong"),
];
