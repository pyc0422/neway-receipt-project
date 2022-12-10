import React, { useState } from 'react';
import Button from '@mui/material/Button';
import './app.css';
import { Link, Outlet } from "react-router-dom";
import Stock from './Stock.jsx';
import Receipt from './Receipt.jsx';
import History from './History.jsx';
import Header from './header.jsx';
const App = (props) => {

  const [clicked, setClick] = useState(false);
  console.log('clixkws', clicked);
  console.log('11', location.pathname)
  if (location.pathname === '/' && clicked) {
    setClick(false);
  }
  return (
    <>
      <div id="header">
        Neway Inc.
      </div>
      {!clicked ? (
        <div id="content">
          <nav>
            {/* <a className="btn" href={`stock`} >Stock</a>
            <a className="btn" href={`sell`} >Receipt</a>
            <a className="btn" href={`histories`} >History</a> */}
            <Link className="btn" onClick={() => setClick(true)} to={`stock`}>Stock</Link>
            <Link className="btn" onClick={() => setClick(true)} to={`sell`}>Receipt</Link>
            <Link className="btn" onClick={() => setClick(true)} to={`histories`}>History</Link>
          </nav>
        </div>

      ) : <Header setClick={setClick}/>

      }
      <Outlet />
    </>

  )
}

export default App;