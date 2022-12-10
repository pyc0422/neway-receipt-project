const express = require('express');
const path = require('path');
const app = express();
const { getProducts, addProduct, getHistories, addHistory } =require('./controller.js');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/products', getProducts)

app.post('/addProduct', addProduct);

app.get('/history', getHistories);

app.post('/history', addHistory)

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening at Port: ${PORT}`);
})