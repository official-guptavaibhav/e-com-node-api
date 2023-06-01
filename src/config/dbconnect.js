const mongoose = require('mongoose');
require('dotenv').config();

        mongoUrl = process.env.MONGO_URL
        mongoose
            .connect(mongoUrl)
            .then(()=> console.log("<<<<---- Database Connected"))
            .catch((err)=>{
            console.log("<<<<---- Unable to connect to database");
    })