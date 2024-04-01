const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const teacherModel = require('../Model/teacherModel');

const generateToken = (input) =>
    jwt.sign(
        {teacherId: input} ,
        process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRE_TIME},
);


exports.login = async(req , res , next) => {
    const teacher = await teacherModel.findOne({email:req.body.email});
    if(!teacher || !(await bcrypt.compare(req.body.password , teacher.password))) {
        return next(new Error("incorect email or pass"), 401 )
    }

    const token = generateToken(teacher._id);
    res.status(200).json({data: teacher , token});

};