const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: String, enum: ["KG1", "KG2"], required: true }, 
    address: { 
        city: { type: String, required: true },
        street: { type: String, required: true },
        building: { type: String, required: true } 
    }
});


// schema.plugin(AutoIncrement, { inc_field: 'childId' });
module.exports = mongoose.model("Child", schema);
