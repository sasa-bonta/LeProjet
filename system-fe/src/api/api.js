import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
})

export const fetchProducts = ({search, page}) => api.get('products', {params: {search, page}})
export const fetchExchangeRates = () => api.get('currencies')
export const fetchShops = () => api.get('shops')
export const fetchCategories = () => api.get('categories')
export const fetchPage = (page) => api.get('page', {params: {page}})
