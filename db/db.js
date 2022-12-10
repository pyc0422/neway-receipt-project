const { Pool } = require('pg');
const {expand} = require('./helper.js');
const pool = new Pool({
  user: 'yuchen',
  host: 'localhost',
  database: 'neway',
  password: '123',
  port: '5432'
});

//cconst db = Promise.promisifyAll(pool, {multiArgs:true});
module.exports = {
  getProducts: () => {
    return pool
      .query('SELECT * FROM products ORDER BY id ASC')
      .then((results) => {
        return results.rows;
      })
      .catch(err => console.log('getproducts: ', err));
  },

  addProduct: (product, count) => {
    product = product.toLowerCase();
    return pool
      .query('SELECT * FROM products WHERE name=$1', [product])
      .then((result) => {
        if(!result.rows.length) {
          return pool.query('INSERT INTO products (name, stocks) VALUES ($1, $2)', [product, count])
        } else {
          let newCount = result.rows[0].stocks + parseInt(count);
          return pool.query('UPDATE products SET stocks=$1 WHERE name=$2', [newCount, product])
        }
      })
      .then((results) => {
        return results.rows[0]
      })
      .catch(err => console.log(err));
  },

  getHistory: () => {
    let query2 = `SELECT
    id AS id,
    invoice AS invoice_id,
    company,
    phone,
    email,
    createat AS createAt,
    total
    FROM history`
    return pool
      .query(query2)
      .then((results) => {
        console.log('resu', results.rows)
        return results.rows;
      })
  },

  addHistory: ({company, phone, address, email, products, total, date, deposite, invoice}) =>{
    console.log('addhistroy!');
    return pool
      .query(`INSERT INTO history (invoice, company, phone, address, email, createAt, total)
    VALUES('${invoice}', '${company}', '${phone}', '${address}', '${email}', '${date}', '${total}') RETURNING id`)
      .then((res) => {
        console.log("result: ", res.rows[0].id);
        let id = res.rows[0].id;
        const productParams = [];
        products.forEach((item) => {
          productParams.push([id, item.product, parseInt(item.count), Number(item.price), Number(item.total)])
        });
        let text = `INSERT INTO selldetails (history_id, name, count, price, total)
        VALUES ${expand(products.length, 5)}`
        console.log('q: ', text, productParams, productParams.flat());
        return pool.query(text, productParams.flat());
      })
      .then(() => {
        console.log('added!@');
      })
      .catch(err => console.log(err));
  }
}