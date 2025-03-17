import { useContext, useState } from "react";
import logo from '../assets/logo2.png';
import { CartContext } from "../context/CartContext";
import { ThemeContext } from "../context/ThemeContext";
import * as motion from "motion/react-client"



export const Navbar = () => {

  const { openCart } = useContext(CartContext)
  const { theme, toggleTheme} = useContext(ThemeContext)

  const [isOpen, setisOpen] = useState(false)
 /*  console.log('isOpen ->', isOpen); */

 
  const toggleMenu = () => {
    setisOpen(!isOpen)
  }

  const navbarLinks = [
    {
      id: 1,
      title: "Inicio",
      link: "#"
    },
    {
      id: 2,
      title: "Contacto",
      link: "#"
    },
    {
      id: 3,
      title: "Nosotros",
      link: "#"
    },
    {
      id: 4,
      title: "Mi Carrito",
      link: "#"
    },
  ]

  const navbarRedes = [
    {
      id: 1,
      title: "Facebook",
      link: "https://www.facebook.com/panificadoramathius",
      icon: "bi bi-facebook",
    },
    {
      id: 2,
      title: "Instagram",
      link: "https://www.instagram.com/panificadora.mathius/",
      icon: "bi bi-instagram",
    }
  ]

  return (
    <nav className={`w-full ${theme === "oscuro" ? "bg-[#5B0601] bg-opacity-30" : "bg-[#eccac8] bg-opacity-30"}`}>
        {/* VIEW DESKTOP */}
        <div className='flex justify-between items-center sm:px-12 sm:py-6 px-6 py-3'>
          {/* LOGO */}
          <div className='flex items-center gap-2'>
              <img src={logo} 
              alt="Logo panaderia" 
              className='w-[200px] rounded-full'
              />
              <p 
                className={`${theme === "oscuro" ? 'text-white font-bold text-3xl' : "text-[#5B0601] font-bold text-3xl"}`}
              >
                PANIFICADORA
              </p>
          </div>

          {/*VISIBILIDAD MENU HAMBURGUESA */}
          <button 
          className='md:hidden text-white p-2 cursor-pointer text-2xl'
          onClick={toggleMenu}
          >
            {isOpen ? <i className="bi bi-x-circle-fill"></i> : <i className="bi bi-list"></i>}
          </button>

          {/* NAVIGATION LINKS */}
          <div className='hidden md:block'>
            <ul className='flex space-x-4 px-4'>
              {navbarLinks.map((link)=> (
                <li key={link.id}>
                  {link.id === 4 ? (
                    <button 
                      className={`${theme === "oscuro" ? 'text-lg text-white p-0.5 hover:text-yellow-500 transition-transform duration-300 transform hover:scale-130 inline-block border-2 border-solid rounded-xl' : 'text-lg text-black p-0.5 hover:text-orange-800 transition-transform duration-300 transform hover:scale-130 inline-block border-2 border-solid rounded-xl'}`}
                      onClick={openCart}
                    >
                      {link.title}<i className="m-1 bi bi-cart"></i>
                    </button>
                  ) : (
                    <a 
                    href="/" 
                    className={`${theme === "oscuro" ? 'text-lg text-white hover:text-yellow-500 transition-transform duration-300 transform hover:scale-110 inline-block' : 'text-lg text-black hover:text-orange-800 transition-transform duration-300 transform hover:scale-110 inline-block'}`}
                    >{link.title}</a>

                  )}
              </li>
              )
              )}          
            </ul>
          </div>

              {/* MODO CLARO/OSCURO */}
          <div>
            <p className={`${theme === "oscuro" ? "text-white" : "text-black"}`}
            >
              {theme === "oscuro" ? "Modo Oscuro" : "Modo Claro"}
            </p>
              <button
                className={`flex items-center w-20 h-10 p-1 rounded-full cursor-pointer transition-all ${theme === "oscuro" ? "bg-rose-400 justify-end" : "bg-gray-800 justify-start"}`}
                onClick={toggleTheme}
              >  
                <motion.div
                  className="w-8 h-8 bg-white rounded-full shadow-md"
                  layout
                  transition={{
                    type: "spring",
                    visualDuration: 0.2,
                    bounce: 0.2,
                }}
                />

              </button>
          </div>

          {/* NAVIGATION REDES */}
          <div className='hidden md:block'>
            <ul className='flex space-x-4 px-4'>
              {navbarRedes.map((link)=> (
                <li key={link.id}>
                  <a 
                  href={link.link}
                  target="_blank"
                  >
                    <i className={`${link.icon} ${theme === "oscuro" ? "sm:text-2xl text-lg text-white transition-all duration-300 hover:text-yellow-500" : "sm:text-2xl text-lg text-black transition-all duration-300 hover:text-orange-800"}`}>
                    </i>                   
                  </a>
              </li>
              )
              )}          
            </ul>
          </div>

        </div>

        {/* VIEW MOBILE */}
        <div className={`md:hidden absolute w-full bg-gray-600 bg-opacity-30 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
              
              {/* NAVIGATION LINKS MOBILE*/}
          
            <ul className='flex flex-col px-4 py-2'>
              {navbarLinks.map((link)=> (
                <li className='py-2 text-center' key={link.id}>               
                  {link.id === 4 ? (
                    <button 
                      className={`${theme === "oscuro" ? 'text-lg text-white p-0.5 border-2 border-solid rounded-xl' : 'text-lg text-black p-0.5 inline-block border-2 border-solid rounded-xl'}`}
                      onClick={openCart}
                    >
                      {link.title}<i className="m-1 bi bi-cart"></i>
                    </button>
                  ) : (
                    <a 
                    href="/" 
                    className={`${theme === "oscuro" ? 'text-lg text-white' : 'text-lg text-black'}`}
                    >{link.title}</a>

                  )}
              </li>
              )
              )}          
            </ul>
              {/* NAVIGATION REDES MOBILE*/}
          
            <ul className='flex space-x-4 px-4 py-2 border-t border-yellow-700 justify-center'>
              {navbarRedes.map((link)=> (
                <li key={link.id}>
                  <a 
                  href={link.link} 
                  target="_blank"
                  className='text-white px-2 inline-block'
                  onClick={() => setisOpen(false)}
                  >
                    <i className={`${link.icon} text-lg text-white px-2 hover:text-yellow-500`}
                    ></i>
                    {link.title}
                  </a>
              </li>
              ))}          
            </ul>
        </div>
    </nav>
  )
}




 