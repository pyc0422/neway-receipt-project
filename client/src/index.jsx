import { createRoot } from 'react-dom/client';
import React from 'react';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
// } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './components/App.jsx';
import Stock from './components/Stock.jsx';
import Receipt from './components/Receipt.jsx';
import History from './components/History.jsx';
import ShowReceipt from './components/ShowReceipt.jsx';
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path:'stock',
//     element: <Stock />
//   },
//   {
//     path:'sell',
//     element: <Receipt />
//   },
//   {
//     path:'histories',
//     element: <History />
//   },
//   {
//     path:'sell/receipt',
//     element: <ShowReceipt />
//   }
// ])
// createRoot(document.getElementById('app')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );

createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/stock" element={<Stock />} />
          <Route path="/sell" element={<Receipt />} />
          <Route path="/histories" element={<History />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)