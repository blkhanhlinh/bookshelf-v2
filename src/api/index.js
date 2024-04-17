import axios from 'axios';
import { API_URL } from '@/constant/api';

export async function getBooksFromAPI() {
  try {
    const response = await axios.get(`${API_URL}books`);
    if (response.status === 200) {
      const data = response.data;
      return data;
    }
    throw new Error('Failed to fetch books');
  } catch (error) {
    console.error('Error fetching books:', error);
    return [];
  }
}