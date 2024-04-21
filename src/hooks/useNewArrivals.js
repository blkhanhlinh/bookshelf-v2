import { useState, useEffect } from "react"

const useNewArrivals = (books) => {
    const [newArrivals, setNewArrivals] = useState([])

    useEffect(() => {
        if (books.length > 0) {
            const sortedBooks = [...books].sort((a, b) => {
                return b.published_year - a.published_year
            }).slice(0, 20)
            setNewArrivals(sortedBooks)
        }
    }, [books])

    return newArrivals
}

export default useNewArrivals