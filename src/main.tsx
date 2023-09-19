import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Order from './components/Order'
import OrderManagement from './components/OrderManagement'
import RouteLayout from './routes/RouteLayout'
import './index.css'

const router = createBrowserRouter([
  {path:'/', element:<RouteLayout/>, children: [
    {path:'/', element:<Order/>, children: []},
    {path:'/order-admin', element:<OrderManagement/>, children: []},
  ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
