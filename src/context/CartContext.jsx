import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {

  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    try {
      const storedCart  = localStorage.getItem("cart") || [];
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Error al parsear locaStorage:", error);
      return [];      
    }
  })
 

    useEffect(() => {
      fetch("/src/products.json")
        .then((res) => res.json())
        .then((data)=> setProducts(data))
        .catch((error) => console.error("Error al cargar productos", error))
      }, []);
    
  /*   useEffect(() => {
      try {
        const storedCart = localStorage.getItem("cart");
        console.log("Productos cargados en localStorage al iniciar:", storedCart);
        if (storedCart){
          setCart(JSON.parse(storedCart))
        }
      } catch (error) {
        console.error("Error al cargar el carrito", error);
        setCart([])
      }
    }, [])
     */

    useEffect(() => {
      try {
        if(cart.length > 0){
          localStorage.setItem("cart", JSON.stringify(cart.filter((item) => item !== null)))
          console.log("Carrito guardado en localStorage", cart);         
        }
      } catch (error) {
        console.error("Error al guardar el carrito:", error);       
      }
    }, [cart])

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    const addToCart = (product) => {
        setCart((prevCart) => {
          const existingProduct = prevCart.find((item) => item.id === product.id);
          if (existingProduct) {
            return prevCart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            return [...prevCart, { ...product, quantity: 1 }];
          }
        });
      };

    const removeFromCart = (productRemove) => {
        setCart((prevCart) => {
          return prevCart.map((product) => product.id === productRemove.id 
            ? {...product, quantity: product.quantity - 1} 
            : product).filter(product => product.quantity > 0)
        })
    } 


    const updateQuantity = (id, quantity) => {
        setCart((prevCart) =>
          prevCart.map((product) =>
            product.id === id ? { ...product, quantity: Math.max(1, quantity) } : product
          )
        );
    }; 

    const removeProduct = (productID) => {
      setCart(cart.filter(product => product.id !== productID))
      localStorage.setItem("cart", JSON.stringify([]))
    }

    const clearCart = () => {
      setCart([]); // Vacía el carrito
      localStorage.setItem("cart", JSON.stringify([]))
  };


    return (
        <CartContext.Provider value={{ 
          cart, 
          products, 
          isCartOpen,
          openCart,
          closeCart,
          addToCart, 
          removeFromCart, 
          updateQuantity,
          removeProduct,
          clearCart,
         
          }}>
            {children}
        </CartContext.Provider>
    )
}