export function MongooseConnectionFile() {
    return `const mongoose = require('mongoose')
let uri = process.env.db
const dbConnection = ()=>{
    mongoose.connect(uri).then(data=>{console.log('Mongo server is connected successfuly!')}).catch(err=>console.log('An error ocurred while connection with mongodb',err))
}
module.exports = {dbConnection}`
}