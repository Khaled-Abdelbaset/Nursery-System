const mongoose = require("mongoose");
const autoIncrement = require('@alec016/mongoose-autoincrement');
const connection = mongoose.connection
autoIncrement.initialize(connection);

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    supervisor: { type: mongoose.Schema.ObjectId, ref: "teacher", required: true }, 
    children: [{ type: Number, ref: "child" }]
});

schema.plugin(autoIncrement.plugin, { model: 'class', field: '_id' });
schema.plugin(autoIncrement.plugin, {
    model: 'class',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("class", schema);
