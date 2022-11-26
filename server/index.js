const express = require('express');
const path = require('path');
const app = express();
const {addProduct, getProducts, addHistory} = require('../db/db.js');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));


let PORT = process.env.PORT || 3000;

app.get('/products', (req, res) => {
  getProducts((data) => {
    console.log('dddd', data);
    res.status(200).json(data);
  });
})

app.get('/history', (req, res) => {

})
app.post('/addProduct', (req, res) => {
  console.log('start addproduct express', req.body);
  const {name, count} = req.body;
  addProduct(name, count, () => {
    res.status(201).send('add new product!');
  });

})

app.post('/addReceipt', (req, res) => {
  console.log("add: ", req.body.receipt);
  return addHistory(req.body.receipt)
    .then(() => {
      res.status(201).send('just added!')
    })
    .catch(err => res.status(400).json(err));
})

app.post('/search', (req, res) => {

})
app.listen(PORT, () => {
  console.log(`Listening at Port: ${PORT}`);
})