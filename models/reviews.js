let mongoose = require('mongoose')
let Schema = mongoose.Schema;

let reviewSchema = Schema({
    comment: {
        type:String
    }, 
    rating:{
        type:Number,
        max:5,
        min:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('review',reviewSchema)