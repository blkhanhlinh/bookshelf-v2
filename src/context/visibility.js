import { createContext, useContext, useState } from "react"

const VisibilityContext = createContext()

export const useVisibility = () => useContext(VisibilityContext)

export const VisibilityProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(true)
    return (
        <VisibilityContext.Provider value={{ isVisible, setIsVisible }}>
            {children}
        </VisibilityContext.Provider>
    )
}