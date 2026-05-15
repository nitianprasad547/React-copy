import './App.css'
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
//Routes component tell the website that all components in one page

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>

        <Route path="checkout" element={<CheckoutPage/>}/>
        <Route path="orders" element={<OrdersPage/>}/>
      </Routes>
    </>
  )
}
//instead of path="/" we can use index. 
export default App
