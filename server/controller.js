const db = require('../db/db.js');

module.exports = {
  getProducts: (req, res) => {
    return db.getProducts()
      .then((data) => {
        res.status(200).json(data);
      })
      .catch(err => res.status(400).json(err));
  },

  addProduct: (req, res) => {
    const {name, count} = req.body;
    return db.addProduct(name, count)
      .then((data) => {
        res.status(201).json(data);
      })
      .catch(err => res.stauts(400).json(err));
  },

  getHistories: (req,res) => {
    return db.getHistory()
      .then((data) => {
        res.status(200).json(data);
      })
  },

  addHistory: (req, res) => {
    return db.addHistory(req.body.receipt)
      .then(() => {
        res.status(201).send('just added!')
      })
      .catch(err => res.status(400).json(err));

  }
}