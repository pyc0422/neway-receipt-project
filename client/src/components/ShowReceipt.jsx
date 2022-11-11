import React from 'react';
import {v4 as uuidv4} from 'uuid'
const ShowReceipt = ({receipt}) => {
  const date =  new Date(Date.now());
  console.log('date', date);
  return (
    <>

      <table>
        <thead>
          <tr><th className="m-font">Neway Supplies Inc.</th></tr>
          <tr>
            <td>Street Address: </td><td>neway address</td>
            <td>P: Phone Number: </td><td>neway phone number</td>
            <td>Email: </td><td>neway phone number</td>
          </tr>
          <tr>
            <td>City, State ZIP code: </td><td>neway address</td>
            <td>E: Fax Number: neway </td><td>phone number</td>
            <td>Website: neway phone </td><td>{date.toLocaleString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bill to:</td><td>{receipt.company}</td>
            <td>Phone:</td><td>{receipt.phone}</td>
            <td>Invoice#</td><td>{uuidv4()}</td>
          </tr>
          <tr>
            <td>Address:</td><td>{receipt.phone}</td>
            <td>Fax:</td><td>{receipt.fax}</td>
            <td>Invoice Date</td><td>2022</td>
          </tr>
        </tbody>
        <tfoot>
            <tr>
              <td>Item#</td>
              <td>Product</td>
              <td>Qty</td>
              <td>Unit Price</td>
              <td>Discount</td>
              <td>Price</td>
            </tr>
          {receipt.products.map((product, i) => {
            return (
              <tr key = {i}>
                <td>{i+1}</td>
                <td>{product.product}</td>
                <td>{product.count}</td>
                <td>${product.price}</td>
                <td>Discount</td>
                <td>${product.total}</td>
              </tr>
            )

          })}

            <tr><td>Invoice Subtotal</td><td>${receipt.total}</td></tr>
            <tr><td>Tax Rate</td><td>10%</td></tr>
            <tr><td>Sale Tax</td><td>${receipt.total * 0.1}</td></tr>
            <tr><td>Other</td><td>None</td></tr>
            <tr><td>Deposit Received:</td><td>{receipt.deposit}</td></tr>
            <tr><th>Total:</th><td>${(receipt.total * 1.1).toFixed(2)}</td></tr>
          </tfoot>
      </table>
      </>
  )
}

export default ShowReceipt;