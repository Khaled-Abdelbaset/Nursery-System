const childSchema = require("../Model/childModel");
const classSchema = require("../Model/classModel");
const multer  = require('multer');

const multerStorage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, 'photos/children');
    },
    filename: function (req, file, callback) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `children-${Date.now()}.${ext}`;
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
exports.uploadChildImage = upload.single('image');

exports.getChilds = (req , res  ,next) => {
    childSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
};


exports.getChildById = (req , res ,next) => {
    childSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("Child Not Found");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
};

exports.addChild = (req , res , next) => {
    let object = new childSchema(req.body);
    object
    .save()
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => next(error));
};

exports.updateChild = (req , res , next) => { 
    childSchema.updateOne({
        _id:req.params.id
    },{
        $set:{
            fullName:req.body.fullName,
            email:req.body.email,
            password:req.body.password
        }
    }).then(data=>{
        if(data.matchedCount==0)
            next(new Error("Child Not Found"));
        else
            res.status(200).json({data});
    })
    .catch(error=>next(error));
};

exports.deleteChild = (req , res , next) => {
    childSchema.deleteOne({
        _id:req.params.id
    }).then(data=>{
        res.status(200).json({data});
    })
    .catch(error=>next(error));
};