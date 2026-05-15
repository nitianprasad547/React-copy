import './App.css'
import { HomePage } from './pages/HomePage';
import { Routes, Route } from 'react-router-dom';
//Routes component tell the website that all components in one page

function App() {
  return (
    <>
      <Routes>
        <Route index element={<HomePage/>}/>

        <Route path="checkout" element={<div>test checkout page</div>}/>
      </Routes>
    </>
  )
}
//instead of path="/" we can use index. 
export default App
