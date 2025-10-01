import axios from 'axios'
import { useState,useEffect } from 'react'

import { Routes, Route } from 'react-router'
import { HomePage } from './Pages/HomePage'
import { CheckoutPage } from './Pages/CheckoutPage'
import { OrdersPage } from './Pages/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
  useEffect( ()=>{ axios.get('/api/cart-items?expand=product')
    .then((response) => {
      console.log("Cart-response: ", response.data)
      setCart(response.data);
    })
  },[]
  )

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart}/>} />
      <Route path='checkout' element={<CheckoutPage cart={cart}/>} />
      <Route path='orders' element={<OrdersPage cart={cart}/>} />
      <Route path='tracking' element={<TrackingPage />} />
    </Routes>
  )
}

export default App
