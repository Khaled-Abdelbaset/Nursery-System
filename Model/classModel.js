const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new mongoose.Schema({
    _id: { type: Number, unique: true },
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.ObjectId, ref: "teacher", required: true }, 
    children: [{ type: Number, ref: "child" }]
});

module.exports = mongoose.model("class", schema);
