import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import ShowReceipt from './ShowReceipt.jsx';
import axios from 'axios';

const Receipt = (props) => {
  const [product, setProduct] = useState('');
  const [count, setCount] = useState(0);
  const [productLine, setProductLine] = useState(1);
  const [price, setPrice] = useState(0);
  const [newReceipt, setReceipt] = useState({company: '', phone:'',address:'', email:'', products:[], total:0, date: '', deposit: 0})
  const [showReceipt, setShowReceipt] = useState(false);

  const [products, setProducts] = useState([]);

  const getProducts = () => {
    return axios.get('/products')
  }
  useEffect(() => {
    getProducts()
      .then((data) => {
        console.log('data: ', data);
        setProducts(data.data);
      })
  }, [products.length])

  const addMoreProduct = (e) => {
    e.preventDefault();
    setProductLine(productLine + 1);
  }

  const addOne = (e) => {
    e.preventDefault();
    if (!product.length || count === 0) {
      alert('Please fill in the blank first!');
      return;
    }
    newReceipt.products.map(item => {
      if (item.product === product) {
        alert('You alread add this product! Please Delete!');
        return;
      }
    })
    setReceipt({...newReceipt, products: newReceipt.products.concat([{product: product, count: count, price: price, total: count * price}])});
    setProduct('');
    setCount(0);
    setPrice(0);
  }

  const deleteOne = (e, i) => {
    e.preventDefault();
    newReceipt.products.splice(i, 1);
    console.log('new', newReceipt.products);
    setProductLine(productLine - 1);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let newDate = new Date(Date.now()).toLocaleString()
    console.log("newDat: ", newDate);
    setReceipt({...newReceipt, date: newDate});
    setShowReceipt(true);
  }

  useEffect(() => {
    let sum = !newReceipt.products.length ? 0 : newReceipt.products.reduce((acc, n) => (acc += n.total),0)
    setReceipt({...newReceipt, total: sum});
  }, [newReceipt.products.length])

  return (
    <div id="receipt">
      {showReceipt ? <ShowReceipt receipt={newReceipt} show={showReceipt} setShow={setShowReceipt}/> :
      <>
        <div className="title">Add a new receipt</div>
        <span>Please fill in below field</span>
        <form onSubmit={handleSubmit}>
          <label>Company Name:
            <input type="text" value={newReceipt.company} onChange={(e) => setReceipt({...newReceipt, company: e.target.value})}/>
          </label>
          <br/>
          <label>Phone number:
            <input type="text" value={newReceipt.phone} onChange={(e) => setReceipt({...newReceipt, phone: e.target.value})}/>
          </label>
          <br/>
          <label>Address:
            <input type="text" value={newReceipt.address} onChange={(e) => setReceipt({...newReceipt, address: e.target.value})}/>
          </label>
          <label>Email:
            <input type="email" value={newReceipt.email} onChange={(e) => setReceipt({...newReceipt, email: e.target.value})}/>
          </label>
          <hr />
          {Array.from({length: productLine}, (e, i) =>  i).map((i) =>
          <div key={i}>
            <label>Product:</label>
            <select id="product" name="product" value={!newReceipt.products[i] ? product : newReceipt.products[i].product} onChange={(e) => setProduct(e.target.value)}>
              <option value="select below">Select below</option>
              {products.map((item,j) =>  (
                <option key={j} id={j} value={item.name}>{item.name}({item.stocks})</option>
              ))}
            </select>
              {/* <input type="text" value={!newReceipt.products[i] ? product : newReceipt.products[i].product} onChange={(e) => setProduct(e.target.value)}/>
            </label> */}
            <label>Count:
              <input type="number" value={!newReceipt.products[i] ? count : newReceipt.products[i].count} min={0}onChange={(e) => setCount(e.target.value)}/>
            </label>
            <label>Unit Price:
              <input type="text" value={!newReceipt.products[i] ? price : newReceipt.products[i].price} onChange={(e) => setPrice(e.target.value)}/>
            </label>
            <button onClick={(e) => addOne(e)}>ADD</button>
            <button onClick={(e, i) => deleteOne(e, i)}>Delete</button>
            <label>Price: ${!newReceipt.products[i] ? 0 : newReceipt.products[i].total}</label>
            <br/>
          </div>)
          }

          <div>Total: ${newReceipt.total}</div>
          <br/>

          <button onClick={(e) => addMoreProduct(e)} >Add More Products</button>
          <hr/>
          <label>Deposit: $
            <input type="text" value={newReceipt.deposit} onChange={(e) => setReceipt({...newReceipt, deposit: e.target.value})} />
          </label>
          <hr/>
          <input className="sm-btn" type="submit" value="Submit" />
          <Link className="sm-btn" to={`/`}>Back</Link>
        </form>

      </>

      }
    </div>

  )


}


export default Receipt;