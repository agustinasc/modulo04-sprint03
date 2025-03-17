import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import {ThemeContext} from "../context/ThemeContext"



export const Cart = () => {
    const { cart, addToCart, removeFromCart, closeCart, clearCart, removeProduct } = useContext(CartContext)
    const { theme } = useContext(ThemeContext)
    const totalCart = cart.reduce((acc, item) => acc + (parseFloat(item.price)) * item.quantity, 0).toFixed(2);

   

  return(
      <>
            <div className={`fixed inset-0 flex items-center justify-center ${theme === "oscuro" ? "bg-black bg-opacity-60" : "bg-[#4b2103] bg-opacity-50 backdrop-blur-sm"} px-2`}>
              <div className={`p-8 rounded-xl shadow-lg w-11/12 max-w-3xl sm:max-w-lg md:max-w-xl lg:max-w-2xl transform transition-all scale-95 hover:scale-100 overflow-y-auto min-h-[50vh] max-h-[80vh] ${theme === "oscuro" ? "bg-[#2D2D2D] text-white" : "bg-[#FAE5CF] text-[#5B0601]"}`}>
               <h2 className="text-xl font-bold mb-4">Mi Carrito de Compras</h2>

                <button
                  onClick={closeCart}
                  className={`absolute top-4 right-6 text-2xl transition 
                    ${theme === "oscuro" ? "text-white hover:text-red-400" : "text-[#5B0601] hover:text-red-700"}`}
                >
                Cerrar
                <i className="bi bi-x"></i>
                </button>
              {
                cart.length === 0 ? (
                  <p className='text-gray-400 text-center text-lg'>Carrito Vacio</p>
                ) : (    
                  cart.map((product, index)=> {
                    return (
                      <div 
                        key={index}
                        className={`flex items-center p-4 m-2 rounded-lg shadow-md ${theme === "oscuro" ? "bg-[#3E3E3E]" : "bg-white"}`}
                      >
                        <img src={product.image} alt={product.title} 
                          className="w-20 h-20 object-cover rounded-md mr-4" 
                        />
                        <div className="flex-1">
                          <p className="text-lg font-semibold">{product.title}</p>
                          <p className={`text-sm ${theme === "oscuro" ? "text-white" : "text-gray-600"}`}>{product.quantity} unidades</p>
                        </div>
                        <div className="flex-1">
                          <p>${product.price}c/u</p>
                          <p className="text-sm font-bold">Subtotal: ${product.price * product.quantity}</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => addToCart(product)}
                            className='bg-emerald-700 text-white  w-12 px-1 py-1 rounded-lg hover:bg-green-500 transition'
                            >
                            <i className="bi bi-plus-lg"></i>
                          </button>
                          <button
                          onClick={() => removeFromCart(product)}
                            className='bg-red-700 text-white  w-12 px-1 py-1 rounded-lg hover:bg-red-500 transition'
                            >
                            <i className="bi bi-dash-lg"></i>
                          </button>
                        </div>
                        
                        <button
                        onClick={() => removeProduct(product.id)}
                          className='bg-blue-800 text-white w-15 px-1 py-1 m-2 rounded-lg hover:bg-blue-500 transition'
                          >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                      
                    )
                  })          
                )
              }
                <div className={`flex border items-center justify-between p-2 m-2 rounded-lg shadow-md
                                ${theme === "oscuro" ? "bg-[#3E3E3E]" : "bg-white"}`}>
                  <img 
                    src="/src/assets/logo2.png" alt="Logo Panaderia" 
                    className="w-20 h-20 object-cover rounded-md mr-4"
                  />
                  <p className={`text-xl font-bold ${theme === "oscuro" ? "text-white" : "text-[#5B0601]"}`}>TOTAL CARRITO ${totalCart}</p>
                  
                  <button className="m-4 w-40 bg-emerald-800 text-white p-2 rounded-lg font-bold hover:bg-green-500 transition">
                    Comprar
                  </button>
                </div>
                  <button
                    onClick={clearCart}
                    className="mt-4 w-40 bg-indigo-800 text-white py-2 rounded-lg font-bold hover:bg-red-500 transition"
                  >
                    Vaciar el carrito
                    <i className="bi bi-trash3"></i>
                  </button>
               
              </div>
          </div>
      </>
    )
}