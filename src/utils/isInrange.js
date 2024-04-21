const isInrange = (price, range) => {
    switch(range) {
        case '0-10':
            return price >= 0 && price <= 10
        case '10-20':
            return price >= 10 && price <= 20
        case '20-30':
            return price >= 20 && price <= 30
        case '30-40':
            return price >= 30 && price <= 40
        case '40-above':
            return price >= 40;
    }
}

export default isInrange