import React, { useRef, useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import ReactToPrint from 'react-to-print';
import axios from 'axios';
const ShowReceipt = ({receipt}) => {
  console.log('receipt: ', receipt, receipt.date, typeof receipt.date);
  // console.log('date', date);
  let componentRef = useRef();
  //const [receipt, setRecipt] = useState(receipt);

  const handleSubmit = (receipt) => {
    receipt.invoice = id;
    console.log('this data sending to db: ', receipt);
    return axios.post('/addReceipt', {receipt})
      .then(() => {
        console.log('already sending to db');
      })
  }
  const [id, setId] = useState('')
  useEffect(()=> {
    let id = uuidv4();
    setId(id);
  }, [id.length])
  return (
    <>

      <table ref={el => (componentRef=el)}>
        <thead>
          <tr><th className="m-font">Neway WholeSale Inc.</th></tr>
          <tr>
            <td>Street Address: </td><td>1111 W 48th St</td>
            <td>P: Phone Number: </td><td>3128639884</td>
            <td>Email: </td><td>sammei1125@yahoo.com</td>
          </tr>
          <tr>
            <td>City, State ZIP code: </td><td>Chicago, IL, 60609</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bill to:</td><td>{receipt.company}</td>
            <td>Phone:</td><td>{receipt.phone}</td>
            <td>Invoice#</td><td>{id}</td>
          </tr>
          <tr>
            <td>Address:</td><td>{receipt.phone}</td>
            <td>Fax:</td><td>{receipt.fax}</td>
            <td>Invoice Date</td><td>{receipt.date}</td>
          </tr>
          <tr>
            <td></td><td></td><td>Email:</td><td>{receipt.email}</td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
              <td>Item#</td>
              <td>Product</td>
              <td>Qty</td>
              <td>Unit Price</td>
              <td>Price</td>
            </tr>
          {receipt.products.map((product, i) =>  (
                <tr key = {i}>
                  <td>{i+1}</td>
                  <td>{product.product}</td>
                  <td>{product.count}</td>
                  <td>${product.price}</td>
                  <td>${product.total}</td>
                </tr>
              )

          )}
            <tr><td>Invoice Subtotal</td><td>${receipt.total}</td></tr>
            <tr><td>Deposit Received:</td><td>{receipt.deposit}</td></tr>
            <tr><th>Total:</th><td>${receipt.total}</td></tr>
          </tfoot>
      </table>
      <div>

        <ReactToPrint
          trigger={() => <button>Print</button>}
          content={() => componentRef}
          onBeforePrint={() => {handleSubmit(receipt)}}
        />

      </div>
    </>
  )
}

export default ShowReceipt;