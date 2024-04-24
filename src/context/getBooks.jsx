import React, { createContext, useState, useEffect } from 'react';
import { getBooksFromAPI, getCategoryList } from '@/api';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const fetchBooks = getBooksFromAPI();
            const fetchCategories = getCategoryList();
            const [books, categoryList] = await Promise.all([fetchBooks, fetchCategories]);
            setBooks(books);
            setCategoryList(categoryList);
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <BooksContext.Provider value={{ books, categoryList, loading }}>
            {children}
        </BooksContext.Provider>
    );
};