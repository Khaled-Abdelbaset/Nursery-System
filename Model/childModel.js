const mongoose = require("mongoose");

const autoIncrement = require('@alec016/mongoose-autoincrement');
const connection = mongoose.connection 
autoIncrement.initialize(connection);

const schema = new mongoose.Schema({
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

schema.plugin(autoIncrement.plugin, { model: 'Child', field: '_id' });
schema.plugin(autoIncrement.plugin, {
    model: 'Child',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

module.exports = mongoose.model("Child", schema);
