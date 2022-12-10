import React, { useRef, useState, useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import ReactToPrint from 'react-to-print';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ShowReceipt = ({receipt, show, setShow}) => {
  console.log('receipt: ', receipt, receipt.date, typeof receipt.date);
  // console.log('date', date);
  let componentRef = useRef();

  //const [receipt, seTableRowecipt] = useState(receipt);

  const handleSubmit = (receipt) => {
    receipt.invoice = id;
    console.log('TableCellis data sending to db: ', receipt);
    return axios.post('/history', {receipt})
      .then(() => {
        console.log('already sending to db');
      })
  }

  const [id, setId] = useState('')
  useEffect(()=> {
    let id = uuidv4();
    setId(id);
  }, [id.length])

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const showOrNot = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showOrNot}>
      <div className="modal-content">
        <div ref={el => (componentRef=el)} >
          <span className="close" onClick={() => setShow(false)}>
            &times;
          </span>
          <TableContainer component={Paper}>
            <Table sx={{minWidTableCell:700, marginTop: "5%"}} aria-label="custom table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{fontSize: "35px", fontWeight: 600, color: "black"}}>Neway WholeSale Inc.</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Address: </TableCell><TableCell colSpan={4}>1111 W 48St, Chicago, IL, 60609</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone Number: </TableCell><TableCell>3128639884</TableCell>
                  <TableCell>Email: </TableCell><TableCell>sammei1125@yahoo.com</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell>Bill to:</TableCell><TableCell>{receipt.company}</TableCell>
                  <TableCell>Phone:</TableCell><TableCell>{receipt.phone}</TableCell>
                  <TableCell>Invoice#</TableCell><TableCell>{id}</TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell>Address:</TableCell><TableCell colSpan={3}>{receipt.address}</TableCell>
                  <TableCell>Invoice Date</TableCell><TableCell>{receipt.date}</TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell>Fax:</TableCell><TableCell>{receipt.fax}</TableCell>
                  <TableCell>Email:</TableCell><TableCell>{receipt.email}</TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
            <Table aria-label="custom table">
              <TableHead>
                <TableRow sx={{backgroundColor: "gray"}}>
                  <TableCell sx={{fontSize: "15px", fontWeight: 600, color: "white"}}>Item#</TableCell>
                  <TableCell sx={{fontSize: "15px", fontWeight: 600, color: "white"}}>Product</TableCell>
                  <TableCell sx={{fontSize: "15px", fontWeight: 600, color: "white"}}>Qty</TableCell>
                  <TableCell sx={{fontSize: "15px", fontWeight: 600, color: "white"}}>Unit Price</TableCell>
                  <TableCell sx={{fontSize: "15px", fontWeight: 600, color: "white"}}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {receipt.products.map((product, i) =>  (
                      <StyledTableRow key = {i}>
                        <TableCell>{i+1}</TableCell>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.count}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>${product.total}</TableCell>
                      </StyledTableRow>
                    )
                )}
                <StyledTableRow><TableCell colSpan={4} align="right">Invoice Subtotal</TableCell><TableCell>${receipt.total}</TableCell></StyledTableRow>
                <StyledTableRow><TableCell colSpan={4} align="right">Deposit Received:</TableCell><TableCell>{receipt.deposit}</TableCell></StyledTableRow>
                <StyledTableRow><TableCell colSpan={4} align="right">Total:</TableCell><TableCell>${receipt.total}</TableCell></StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div><br/>
        <div>
          <ReactToPrint trigger={() => <button>Print</button>} content={() => componentRef} onBeforePrint={() => {handleSubmit(receipt)}}/>
        </div>
      </div>
    </div>
  )
}

export default ShowReceipt;