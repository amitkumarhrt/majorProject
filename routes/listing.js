let express = require("express");
let router = express.Router();
let listing = require('../models/listing');
let wrapAsync = require('../utilis/wrapasync.js')
let expresserror = require('../utilis/errorclass.js');
let {lilaschema,reviewschema}= require('../backendvalidation/schemaValidation.js');


let validateListing = (req,res,next)=>{
    let {error} = lilaschema.validate(req.body)
    // let errmsg = error.details.map((x)=>x.message).join(",")
   if(error){
    next(new expresserror(402,error))
   }else{
    next()
   }
}

router.get('/',wrapAsync(async (req,res)=>{
    let alldata = await listing.find();
    res.render('listings/index.ejs',{alllists:alldata});
}))

router.get('/new',(req,res)=>{
    res.render('listings/new.ejs')
})

router.get('/:id',wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listings = await listing.findOne({_id:id}).populate('review')
    res.render('listings/show.ejs',{listing:listings});
}))

router.get('/:id/edit',wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listings = await listing.findOne({_id:id})
    res.render('listings/edit.ejs',{listing:listings});
}))

router.post('/',validateListing,wrapAsync( async (req,res,next)=>{
//     let result = lilaschema.validate(req.body)
// if(result.error){
// throw new expresserror(410,'problum face')
// }     
    let list = new listing(req.body.lila);
    await list.save()
    res.redirect('http://localhost:8055/listings')  
}))


router.put('/:id',wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await listing.findByIdAndUpdate(id,{...req.body.editedData});
    res.redirect(`http://localhost:8055/listings/${id}`)
}))

router.delete('/:id',wrapAsync( async(req,res)=>{
let {id} = req.params;
await listing.findByIdAndDelete(id);
res.redirect('http://localhost:8055/listings')
}))

module.exports = router;