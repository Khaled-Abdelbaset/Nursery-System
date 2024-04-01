const { body, param, query } = require("express-validator");
const teacherSchema = require("../../Model/teacherModel");
const childSchema = require("../../Model/childModel");

exports.insertValidator = [
    body("name")
        .isAlpha()
        .withMessage("Class Name Should be String")
        .isLength({ min: 5 })
        .withMessage("Class Name Length Must Be > 5"),

    body("supervisor")
    .isMongoId()
    .withMessage("Supervisor Id Should Be Mongo Id")
    .custom(async (val) =>{
        const object = await teacherSchema.findOne({ _id: val });
        if (!object) throw new Error("Supervisor Must Belongs To Teachers");
    }),

    body("children")
        .isArray()
        .withMessage("Must be valid"),

    body("children.*")
        .isInt()
        .withMessage("id should be valid")
        .custom(async (val) => {
            const child = await childSchema.findOne({ _id: val });
            if (!child) throw new Error("child Id must belong to children");
        }),
];

exports.updateValidator = [
    body("name")
        .optional()
        .isAlpha()
        .withMessage("Class Name Should be Strin")
        .isLength({ min: 5 })
        .withMessage("Class Name Length Must Be > 5"),
    body("supervisor")
    .isMongoId()
    .withMessage("Supervisor Id Should Be Mongo Id"),
    body("children")
        .isArray()
        .withMessage("Must be valid"),
    body("children.*")
        .isInt()
        .withMessage("id should be valid"),
];