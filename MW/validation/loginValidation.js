const { body, param, query } = require("express-validator");
const teacherModel = require('../../Model/teacherModel')
const jwt = require('jsonwebtoken');

exports.loginValidator = [
    body("email")
    .notEmpty()
    .withMessage("Email required")
    .isEmail()
    .withMessage("Email have ashape"),

    body("password")
    .notEmpty()
    .withMessage("password required")
];

exports.protect = async(req , res , next) => {
    let token;
    if(req.headers.authorization) {
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next (new Error('Please login to get access', 401))
    };
    const decoded = jwt.verify(token,"process.env.SECRET_KEY");
    const currentUser = await teacherModel.findById(decoded.teacherId);
    if (!currentUser) {
    return next(new Error('The user that belong to this token does no longer exist', 401));
    }
    req.teacher = currentUser;
    next();
};
