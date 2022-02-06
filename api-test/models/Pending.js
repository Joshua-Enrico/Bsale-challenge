const { Schema, model } = require("mongoose")


const PendingRes = new Schema({
    UserId: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }

}, {
    timestamps: true,
})

module.exports =  model('Pending', PendingRes)