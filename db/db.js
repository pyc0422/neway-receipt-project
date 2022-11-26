const { Pool } = require('pg');
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

  addHistory: ({company, phone, address, email, products, total, date, deposite, invoice}) =>{
    console.log('addhistroy!');
    const expand = (rowCount, columnCount, startAt=1) => {
      var index = startAt;
      return Array(rowCount)
        .fill(0)
        .map(
          (v)=>
            `(${Array(columnCount).fill(0).map(
              (q) => `$${index++}`).join(',')})`
        )
        .join(',');
    }
    const flatten = (arr) => {
      let newArr = [];
      arr.forEach((v) => v.forEach((p) => newArr.push(p)));
      return newArr;
    }
    return pool
      .query(`INSERT INTO history (invoice, company, phone, address, email, create_at, total)
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
        console.log('q: ', text, productParams, flatten(productParams), productParams.flat());
        return pool.query(text, productParams.flat());
      })
      .then(() => {
        console.log('added!@');
      })
      .catch(err => console.log(err));

  }

}