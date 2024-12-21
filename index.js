const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors  = require('cors');  
app.use(express.json());
app.use(cors());
let ProductRoutes = require('./routes/product');



app.use('/products', ProductRoutes);


mongoose.connect("mongodb+srv://arakashdeveloper:LlmmKsEH1MNpF2R8@akash.f7phc.mongodb.net/techstore").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error: ', err);
})  


app.listen(4000, () => {
    console.log('Server is running on port 4000');
})