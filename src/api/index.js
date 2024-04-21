import axios from 'axios'
import { API_URL } from '@/constant/api'

export async function getBooksFromAPI() {
    try {
        const response = await axios.get(`${API_URL}books/`)
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch books')
        }
    } catch (error) {
        console.error('Error fetching books:', error)
        throw error
    }
}

export async function getBookById(bookId) {
    try {
        const response = await axios.get(`${API_URL}book_detail/${bookId}/`)
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch book data')
        }
    } catch (error) {
        console.error('Error fetching book:', error)
        throw error
    }
}

export async function searchBooks(searchQuery) {
    try {
        const response = await axios.get(
            `${API_URL}books/${encodeURIComponent(searchQuery)}/`
        )
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch books')
        }
    } catch (error) {
        console.error('Error fetching books:', error)
        throw error
    }
}

export async function getBookRecommendations(bookId) {
    try {
        const response = await axios.get(`${API_URL}book_recommend/${bookId}/`)
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch book recommendations')
        }
    } catch (error) {
        console.error('Error fetching book recommendations:', error)
        throw error
    }
}

export async function getBookCartRecommendation(bookIdList) {
    try {
        const response = await axios.get(
            `${API_URL}book_recommend_cart/${bookIdList}/`
        )
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch book cart recommendations')
        }
    } catch (error) {
        console.error('Error fetching book cart recommendations:', error)
        throw error
    }
}

export async function getCategoryList() {
    try {
        const response = await axios.get(`${API_URL}category_list/`)
        if (response.status === 201) {
            // console.log(response.data)
            return response.data
        } else {
            throw new Error('Failed to fetch category list')
        }
    } catch (error) {
        console.error('Error fetching category list', error)
        throw error
    }
}

export async function getBooksByCategory(category) {
    try {
        const response = await axios.get(`${API_URL}${category}/`)
        if (response.status === 201) {
            return response.data
        } else {
            throw new Error('Failed to fetch book by category')
        }
    } catch (error) {
        console.log('Error fetching books by category')
        throw error
    }
}
