const teacherSchema = require("../Model/teacherModel");
const classSchema = require("../Model/classModel");

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

exports.addTeacher = (req , res , next) => {
    let object = new teacherSchema(req.body);
    object
    .save()
    .then((data) => {
        res.status(200).json({ data });
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

// exports.changeUserPass = async(req , res , next) => {

//     console.log(req.params.id);
//     const document = await teacherSchema.findByIdAndUpdate (
//         req.params.id,
//         {
//             password: await bcrypt.hash(req.body.password, 10)
//         },
//         {new:true}
//     );
//     if(!document){
//         return next(new Error("Password Can't Be Updated"));
//     }
//     res.status(200).json({data:document})
// };

exports.changeUserPass = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const document = await teacherSchema.findByIdAndUpdate(
            req.params.id,
            {
                password: await bcrypt.hash(req.body.password, 10)
            },
            { new: true }
        );
        if (!document) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data: document });
    } catch (error) {
        return next(error);
    }
};

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