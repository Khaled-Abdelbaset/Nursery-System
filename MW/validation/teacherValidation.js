const { body, param, patch } = require("express-validator");
const  bcrypt = require('bcryptjs');
const teacherSchema = require("../../Model/teacherModel");
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
      const teacherSupervise = await classSchema.countDocuments({supervisor: _id});
      console.log(teacherSupervise + "1")
      if (teacherSupervise) {
        console.log(teacherSupervise)
        throw new Error("Teacher Is A Supervisor, Can't Be Deleted");
      }
    })
];

exports.changePassword = [
  body("currentPassword")
  .notEmpty()
  .withMessage("Enter Current Password"),

  body("password")
  .isStrongPassword()
  .withMessage("Password Must Be Strong")
  .custom(async(val, {req}) => {
    const teacher = await teacherSchema.findById(req.params.id)
    if(!teacher){
        throw new Error("Teacher Not Found");
    }
    const isCorrectPassword = await bcrypt.compare(
        req.body.currentPassword,
        teacher.password
    );
    if (!isCorrectPassword) {
      throw new Error('Incorrect current password');
    }
    return true;
  })
];
