import React from 'react';
import { Outlet, Link } from 'react-router-dom'
const App = (props) => {
  return (
    <>
      <div id="header">
        <h1>Neway Inc.</h1>
      </div>
      <div id="content">
        <nav>
          <Link to={`stock`}>Stock</Link>
          <Link to={`sell`}>Receipt</Link>
          <Link to={`history`}>History</Link>
        </nav>


      </div>
    </>

  )
}

export default App;