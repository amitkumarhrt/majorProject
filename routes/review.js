let express = require('express');
let router = express.Router({mergeParams:true});
let listing = require('../models/listing');
let review = require('../models/reviews.js')

let wrapAsync = require('../utilis/wrapasync.js')
let expresserror = require('../utilis/errorclass.js');
let {lilaschema,reviewschema}= require('../backendvalidation/schemaValidation.js');

let validateRating = (req,res,next)=>{
    let {error} = reviewschema.validate(req.body)
    // let errmsg = error.details.map((x)=>x.message).join(",")
    if(error){
        next(new expresserror(405,error))
    }else{
        next()
    }
}


// listings reviews 
router.post('/',validateRating,wrapAsync(
    async (req,res,next)=>{
        let newListing = await listing.findById(req.params.id)
        let newReview = await new review(req.body.rating)
        await newListing.review.push(newReview)
        await newReview.save();
        await newListing.save();
        res.redirect(`http://localhost:8055/listings/${req.params.id}`)
}))


//listing reviews delete
router.delete('/:reviewId',wrapAsync(async (req,res,next)=>{
    let {id,reviewId} = req.params
    await listing.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await review.findByIdAndDelete({_id:reviewId})
    res.redirect(`http://localhost:8055/listings/${id}`)
}))

module.exports = router;