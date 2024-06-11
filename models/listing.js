let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let review = require('./reviews.js');
let listingSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUJADmQ5cMEOoC2hoFnqTS7bhz2KOBBv0uAg&s",
        set : v => v === '' ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxnkcPkUv0t7ThGneG-s2Vs4H27L69BOn_9lqoE65d_Q&s" : v  
    },
    price:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    country:{ 
        type:String,
        required:true
    },
    review:[{
        type:Schema.Types.ObjectId,ref:'review'
    }]
})

listingSchema.post('findOneAndDelete',async (listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.review}})
    }
})

let listing = mongoose.model('listing',listingSchema)

module.exports = listing;