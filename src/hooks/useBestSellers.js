import { useState, useEffect } from "react"

const useBestSellers = (books) => {
    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        if (books.length > 0) {
            const bestSellers = [...books].sort((a, b) => {
                return b.average_rating - a.average_rating
            }).slice(0, 20);
            setBestSellers(bestSellers)
        }
    }, [books])

    return bestSellers
}

export default useBestSellers