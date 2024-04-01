const { body, param, query } = require("express-validator");

exports.insertValidator = [
    body("fullName")
        .isAlpha()
        .withMessage("Child Name Should Be String")
        .isLength({ min: 5 })
        .withMessage("Class Name Length Must Be > 5"),

    body("age")
        .isInt()
        .withMessage("Age must be Int"),

    body("level")
        .isIn(["KG1", "KG2"])
        .withMessage("Level Must Be In [KG1, KG2]"),

    body("address.city")
        .notEmpty()
        .withMessage("City Must Be Entered"),

    body("address.street")
        .notEmpty()
        .withMessage("Street Must Be Entered"),

    body("address.building")
        .notEmpty()
        .withMessage("Building Must Be Entered")
];

exports.updateValidator = [
    body("fullName")
        .optional()
        .isAlpha()
        .withMessage("Child Name Should Be String")
        .isLength({ min: 5 })
        .withMessage("Class Name Length Must Be > 5"),

    body("age")
        .optional()
        .isInt()
        .withMessage("Age must be Int"),

    body("level")
        .optional()
        .isIn(["KG1","KG2"])
        .withMessage("Level Must Be In [KG1, KG2]"),

    body("address.city")
        .optional()
        .notEmpty()
        .withMessage("City Can't Be Empty"),

    body("address.street")
        .optional()
        .notEmpty()
        .withMessage("Street Can't Be Empty"),

    body("address.building")
        .optional()
        .notEmpty()
        .withMessage("Building Can't Be Empty")
];

