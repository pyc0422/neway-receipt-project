import React, { useState, useEffect }from 'react';
import { Link } from 'react-router-dom';
import ShowReceipt from './ShowReceipt.jsx';
const Receipt = (props) => {
  const [product, setProduct] = useState('');
  const [count, setCount] = useState(0);
  const [productLine, setProductLine] = useState(1);
  const [price, setPrice] = useState(0);
  const [newReceipt, setReceipt] = useState({company: '', phone:'',address:'', products:[], total:0, deposit: 0})
  const [showReceipt, setShowReceipt] = useState(false);
  const addMoreProduct = (e) => {
    e.preventDefault();
    if (!product.length || count === 0) {
      alert('Please fill in the blank first!');
      return;
    }
    setReceipt({...newReceipt, products: newReceipt.products.concat([{product: product, count: count, price: price, total: count * price}])});
    setProduct('');
    setCount(0);
    setPrice(0);
    setProductLine(productLine + 1);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (product.length && count !== 0) {
      setReceipt({...newReceipt, products: newReceipt.products.concat({product: product, count: count, price: price, total: count * price})});
    }
    setShowReceipt(true);
  }

  useEffect(() => {
    let sum = !newReceipt.products.length ? 0 : newReceipt.products.reduce((acc, n) => (acc += n.total),0)
    setReceipt({...newReceipt, total: sum});
  }, [newReceipt.products.length])

  return (
    <div id="receipt">
      {showReceipt ? <ShowReceipt receipt={newReceipt} /> :
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
          <hr />
          {Array.from({length: productLine}, (e, i) =>  i).map((i) =>
          <div key={i}>
            <label>Product:
              <input type="text" value={!newReceipt.products[i] ? product : newReceipt.products[i].product} onChange={(e) => setProduct(e.target.value)}/>
            </label>
            <label>Count:
              <input type="number" value={!newReceipt.products[i] ? count : newReceipt.products[i].count} onChange={(e) => setCount(e.target.value)}/>
            </label>
            <label>Unit Price:
              <input type="text" value={!newReceipt.products[i] ? price : newReceipt.products[i].price} onChange={(e) => setPrice(e.target.value)}/>
            </label>
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
        </form>
      </>

      }
    </div>

  )


}


export default Receipt;