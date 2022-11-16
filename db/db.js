const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'yuchen',
  host: 'localhost',
  database: 'neway',
  password: '123',
  port: '5432'
});

//cconst db = Promise.promisifyAll(pool, {multiArgs:true});
module.exports = {
  getProducts: (cb) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (err, res) => {
      if (err) {
        throw err;
      }
      console.log('all products: ', res.rows);
      cb(res.rows);
    })
  },

  updateProducts: (name, count, db) => {
    pool.query('UPDATE products SET stocks=$1 WHERE name=$2', [count, name], (err, res) => {
      if (err) {
        throw err;
      }
      cb(res.rows[0]);
    })
  },

  addProduct: (product, count, cb) => {
    product = product.toLowerCase();
    pool.query('SELECT * FROM products WHERE name=$1', [product], (err, res) => {
      if (err) {
        throw err;
      }
      if (!res.rows.length) {
        pool.query('INSERT INTO products (name, stocks) VALUES ($1, $2)', [product, count], (err, res) => {
          if (err) {
            throw err;
          }
          console.log('INSERT!', res.rows[0]);
          cb(res.rows[0]);
        } )
      } else {
        console.log(typeof res.rows[0].stocks, typeof count);
        let newCount = res.rows[0].stocks + parseInt(count);
        //updateProducts(newCount, product, cb);
        pool.query('UPDATE products SET stocks=$1 WHERE name=$2', [newCount, product], (err, res) => {
          if (err) {
            throw err;
          }
          cb(res.rows[0]);
        })
      }
    })
  },

  // addHistory: (receipt, cb)=>{
  //   pool.query('INSERT INTO receipts (invoice_id, company, phone, fax, email, address, date, deposit, total) VALUES')
  // }

}