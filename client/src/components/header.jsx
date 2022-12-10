import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
const Header = () => {
  let buttonStyle = {
    margin: "1%",
    fontSize: "small",
    color: "black"
  };

  return (
    <>
      <nav>
          <Link onClick={() => setClick(false)} style={buttonStyle} to={`/`}>Home</Link>
          <Link style={buttonStyle} to={`stock`}>Stock</Link>
          <Link style={buttonStyle} to={`sell`}>Receipt</Link>
          <Link style={buttonStyle} to={`histories`}>History</Link>
      </nav>
      <hr/>
    </>

  )
}
export default Header;
