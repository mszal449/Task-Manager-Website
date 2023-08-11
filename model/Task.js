const { kMaxLength } = require('buffer')
const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'name is required'],
        trim : true,
        maxLength : [20, 'name cannot be longer than 20 characters']
    },
    completed : {
        type : Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)