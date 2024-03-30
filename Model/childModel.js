const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: {type: Number, required: true},
    fullName: { type: String, required: true},
    age: { type: Number, required: true},
    level: { type: String, enum: ["KG1", "KG2"], required: true}, 
    address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true } 
    },
    image: {type: String}
});

module.exports = mongoose.model("Child", schema);
