const mongoose = require('mongoose')
const app = require('./app');

const server = require('./config/ServerConfig')


app.listen(8082, async ()=>{
    console.log("logged In");
    await mongoose.connect(server.mongoose.url);
    console.log("database connected");
})