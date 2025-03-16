
import { useContext } from 'react'
import './App.css'
import { Cart } from './components/Cart'
import  { Navbar }  from './components/Navbar'
import { Products } from './components/ProductList'
import { CartContext } from './context/CartContext'



function App() {
  
  const { isCartOpen, openCart, closeCart } = useContext(CartContext)

  return (
    <>
      <Navbar openCart={openCart}/>
      <Products />
      {isCartOpen && <Cart closeCart={closeCart}/>}
    </>
  )
}

export default App
