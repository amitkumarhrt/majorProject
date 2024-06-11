let mongoose = require('mongoose');
let data = require('./data.js')
let listing = require('D:/coding/MAJORPROJECT/models/listing.js')

main().then(()=>console.log('connected to database')).catch(e=>console.log(e))
async function main(){
   await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
}

listing.insertMany(data).then((x)=>console.log(x)).catch((x)=>console.log(x))

