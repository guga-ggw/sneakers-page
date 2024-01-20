import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Main.scss'
import { Route, Routes } from 'react-router'
import MainPage from './Pages/MainPage'
import ProductsPage from './Pages/Products'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route element={<MainPage/>} path='/'/>
        <Route element={<ProductsPage/>} path='/product'/>
      </Routes>
    </>
  )
}

export default App
