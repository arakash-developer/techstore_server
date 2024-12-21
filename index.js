const express = require('express');
const app = express();
app.use(express.json());
let ProductRoutes = require('./routes/product');

// app.get('/', (req, res) => {
//     res.send('Hello World');
// })

// app.post('/products', (req, res) => {
//     let { title, price } = req.body;
//     res.send(title + price);
// })

app.use('/products', ProductRoutes);
// app.use('/products', ProductRoutes);
app.listen(4000, () => {
    console.log('Server is running on port 4000');
})