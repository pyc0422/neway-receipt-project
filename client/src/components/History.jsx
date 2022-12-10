import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Header from './header.jsx';
const History = (props) => {
  const [keyWord, setKeyWord] = useState('');
  const [receipts, setReceipts] = useState([]);
  const getHistory = () => {
    axios.get('/history')
      .then((data) => {
        console.log('data', data.data);
        setReceipts(data.data);
      })
  }

  const hanldeSearch = () => {
    console.log(keyWord, 'will be searched');
    //write a function to handle search after get all history
  }
  const showDetail = () => {
    console.log('should show the product list or just show the receipt!')
  }
  useEffect(() => {
    getHistory();
  }, [receipts.length])


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div>
      <div style={{margin: "2%", fonSize: "small"}}>Recently History</div>
      <div>
        <input type="text" value={keyWord} onChange={(e) => setKeyWord(e.target.value)}/>
        <button onClick={hanldeSearch}>Search</button>
      </div>
      <hr/>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 700}} aria-label="customized talbe">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="center">Company</TableCell>
              <TableCell align="center">Phone</TableCell>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center">Amont</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Receipt#</TableCell>
              <TableCell align="center">Detail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {receipts.map((row) => (
              <StyledTableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="center">{row.company}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">${row.total}</TableCell>
                <TableCell align="left" sx={{fontSize: "12px"}}>{row.invoice_id}</TableCell>
                <TableCell align="left">{row.createAt}</TableCell>
                <TableCell align="center" className="sm-btn" onClick={showDetail}>Show</TableCell>
              </StyledTableRow>
            ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      {/* <table className="table-Secondary">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Company</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Receipt-Id</th>
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          {receipts.map((row) => (
            <tr key={row.id}>
              <td scope="row">{row.id}</td>
              <td>{row.company}</td>
              <td>{row.phone}</td>
              <td>{row.address}</td>
              <td>${row.total}</td>
              <td>{row.invoice_id}</td>
              <td>{row.createAt}</td>
              <td className="sm-btn" onClick={showDetail}>Show</td>
            </tr>
          ))
          }
        </tbody>
      </table> */}
    </div>
  )
}

export default History;