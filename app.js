let express = require('express');
var methodOverride = require('method-override');
let ejsMate = require('ejs-mate'); // for boilerplate
let app = express();
let port = 8055;
let mongoose = require('mongoose');
let ejs = require('ejs');
let path = require('path')
let listing = require('./models/listing');
let review = require('./models/reviews.js')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.engine('ejs', ejsMate);
let wrapAsync = require('./utilis/wrapasync.js')
let expresserror = require('./utilis/errorclass.js');
// const { error } = require('console');
let {lilaschema,reviewschema}= require('./backendvalidation/schemaValidation.js');
// const wrapasync = require('./utilis/wrapasync.js');
let listingrouter = require('./routes/listing.js')
let reviewrouter = require('./routes/review.js')
main().then(()=>console.log('connected to database')).catch(e=>console.log(e));
 
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get('/',(req,res)=>{
    res.send('home Route')
})

app.use("/listings",listingrouter)
app.use("/listings/:id/reviews",reviewrouter)

app.all("*",(req,res,next)=>{
    next(new expresserror(404,'page not found'))
})

app.use((err,req,res,next)=>{
   let {status = 400,message = 'something went wrong'} = err 
res.status(status).render('Error/error.ejs',{message})
})

app.listen(port,e => e ? console.log(e) : console.log('server run sucessfully'));