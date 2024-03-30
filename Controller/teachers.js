const teacherSchema = require("../Model/teacherModel");
const  bcrypt = require('bcryptjs');
const classSchema = require("../Model/classModel");
const multer  = require('multer');

const multerStorage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, 'photos/teacher');
    },
    filename: function (req, file, callback) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `teacher-${Date.now()}.${ext}`;
        callback(null, fileName);
    },
});

const multerFilter = function (req, file, callback) {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("only images allowed", 400), false);
    }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadTeacherImage = upload.single('image');

exports.addTeacher = (req , res , next) => {
    let object = new teacherSchema(req.body);
    object
    .save()
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => next(error));
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


exports.updateTeacher = (req , res , next) => { 
    teacherSchema.updateOne({
        _id:req.params.id
    },{
        $set:{
            fullName:req.body.fullName,
            email:req.body.email,
            
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Teacher Not Found"));
        else
            res.status(200).json({data});
    })
    .catch(error=>next(error));
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