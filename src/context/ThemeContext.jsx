import React, { createContext, useState, useEffect } from 'react'

export const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {

    const [ theme, setTheme ] = useState(() => {
         return localStorage.getItem("theme") || "claro"
    })

    /* para actualizar el local storage */
    useEffect(() => {
      localStorage.setItem("theme", theme);
      document.documentElement.className = theme
    
    }, [theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "claro" ? "oscuro" : "claro"))
    }

    return(
        <ThemeContext.Provider 
            value={{
                theme, 
                toggleTheme
            }}>
            {children}
        </ThemeContext.Provider>
    )
    
}

export default ThemeContext