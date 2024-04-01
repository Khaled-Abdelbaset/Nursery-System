const teacherSchema = require("../Model/teacherModel");
const bcrypt = require('bcryptjs');
const classSchema = require("../Model/classModel");
const fs = require('fs');

exports.addTeacher = (req, res, next) => {
    let object = new teacherSchema(req.body);
    if (req.file) {
        object.image = `${Date.now()}-${req.file.originalname}`;
        fs.writeFile(`Photos/teacher/${object.image}`, req.file.buffer, (err) => {
        if (err) return next(err);
        object
            .save()
            .then((data) => {
            res.status(200).json({ data });
            })
            .catch((error) => next(error));
        });
    } else {
        object
        .save()
        .then((data) => {
            res.status(200).json({data});
        })
        .catch((error) => next(error));
    }
};

exports.getTeachers = (req , res  ,next) => {
    teacherSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};

exports.getTeacherById = (req , res ,next) => {
    teacherSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("Teacher Not Found");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
};


// exports.updateTeacher = (req , res , next) => { 
//     teacherSchema.updateOne({
//         _id:req.params.id
//     },{
//         $set:{
//             fullName:req.body.fullName,
//             email:req.body.email,
//         }
//     }).then(data=>{
//         if(data.matchedCount == 0)
//             next(new Error("Teacher Not Found"));
//         else
//             res.status(200).json({data});
//     })
//     .catch(error=>next(error));
// };

exports.updateTeacher = (req, res, next ) => {
    let updateData = { ...req.body };
    delete updateData._id;
    delete updateData.password; 

    if (req.file) {
        req.body.image = `${Date.now()}-${req.file.originalname}`;
        fs.writeFile(
        `./photos/teacher/${req.body.image}`,
        req.file.buffer,
        (err) => {
            if (err) return next(err);
            updateTeacherData(req, res, next, updateData);
        }
        );
    } else {
      updateTeacherData(req, res, next, updateData);
    }
  };

exports.changeUserPass = async(req , res , next) => {
    const updatePass = await teacherSchema.findByIdAndUpdate(
        req.params.id,
        {
            password:await bcrypt.hash(req.body.password, 10)
        });
    if(!updatePass){
        return next(new Error(`Can Not Update Password OF This Id : ${req.params.id}`) , 404);
    }
    res.status(200).json({data:updatePass})
}

exports.deleteTeacher = (req , res , next) => {
    teacherSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.allClassSupervisors = (req , res , next) => {
    classSchema.find({supervisor: req.params.id})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};