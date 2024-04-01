const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema(
    {
        fullName: { type: String, required: true},
        password: {type: String , required: true},
        email: {type: String, require: true},
        image: {type: String},
        role: {
            type: String,
            enum: ['user', 'admin'],
            default:'user'
        }
    }
);

schema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("teacher", schema);
