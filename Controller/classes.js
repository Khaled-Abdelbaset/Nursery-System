const classSchema = require("../Model/classModel");

exports.getClasses = (req, res, next) => {
  classSchema.find({})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
}

exports.getClassById = (req, res, next) => {
  classSchema.findOne({ _id: req.params.id })
    .then((object)=>{
        if (!object) {
            throw new Error("Class Not Found");
        }
        res.status(200).json({ object });
    })
    .catch((error) => next(error));
}

exports.addClass = (req, res, next) => {
  let object = new classSchema(req.body);
    object
    .save()
    .then((data) => {
        res.status(200).json({ data });
    })
    .catch((error) => next(error));
}

exports.updateClass = (req, res, next) => {
  classSchema.updateOne({
    _id:req.params.id
},{
    $set:{
        name:req.body.fullName,
        supervisor:req.body.supervisor,
        children:req.body.children
    }
}).then(data=>{
    if(data.matchedCount==0)
        next(new Error("Class Not Found"));
    else
        res.status(200).json({data});
})
.catch(error=>next(error));
}

exports.deleteClass = (req, res, next) => {
  classSchema.deleteOne({
    _id:req.params.id
  }).then(data=>{
      res.status(200).json({data});
  })
  .catch(error=>next(error));
}

exports.getClassChild = (req, res, next) => {
  classSchema.find({children:req.params.id})
    .then((data) => {
        res.status(200).json({data});
    })
    .catch((error) => next(error));
}

exports.allClassSupervisors = (req, res, next) => {
  classSchema.find({supervisor:req.params.id})
    .then((data)=>{
        res.status(200).json({data});
    })
    .catch((error) => next(error));
}