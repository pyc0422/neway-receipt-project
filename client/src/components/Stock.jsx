import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Stock = (props) => {
  const [product, setProduct] = useState({name:'', count:0});
  const [products, setProducts] = useState([]);
  const getAllProducts = () => {
    axios.get('/products')
    .then((result) => {
      setProducts(result.data);
    })
  }

  const handleSubmit = ({name, count}) => {
    name = name.toLowerCase();
    return axios.post('/addProduct', {name, count})
      .then(() => {
        getAllProducts();
        setProduct({name:'', count:0})
      })
  }

  useEffect(() => {
    getAllProducts()
  }, [products.length])

  return (
    <>
      <div>
        <input type="text" value={product.name} onChange={(e) => {setProduct({...product, name: e.target.value})}}/>
        <input type="number" value={product.count} onChange={(e) => {setProduct({...product, count: e.target.value})}} />
        <button onClick={() => {handleSubmit(product)}} >Submit</button>
      </div>
      {!products.length ? null :
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Product</th><th>Stocks</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item,i) => (
              <tr key={i}>
                <td>{item.id}</td><td>{item.name}</td><td>{item.stocks}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </>

  )
}

export default Stock;