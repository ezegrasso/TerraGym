import axios from 'axios'

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // necesario para la cookie httpOnly del JWT
})