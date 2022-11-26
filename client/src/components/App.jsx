import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import './app.css'
const App = (props) => {

  return (
    <>
      <div id="header">
        Neway Inc.
      </div>
      <hr/>
      <div id="content">
        <nav>
          <Link className="btn" to={`stock`}>Stock</Link>
          <Link className="btn" to={`sell`}>Receipt</Link>
          <Link className="btn" to={`history`}>History</Link>
        </nav>
      </div>
    </>

  )
}

export default App;