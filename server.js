const express = require('express');
const app = express();
require('dotenv').config();
const authRoute = require('./src/routes/authRoute')
const productRoute = require('./src/routes/productRoute')
const cartRoute = require('./src/routes/cartRoute')
const orderRoute = require('./src/routes/orderRoute')

// Parsing JSON data 
app.use(express.json());

// Database Connection
require('./src/config/dbconnect')

// Routes
app.use('/api/test',(req, res)=>{
    return res.send('API is Running')
})

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

// Server 
const port = process.env.PORT || 3000
app.listen(port, ()=>{
    console.log(`<<<<---- Server is running on ${port}`)
})