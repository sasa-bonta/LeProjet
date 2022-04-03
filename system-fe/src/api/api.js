import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/api/'
})

export const fetchProducts = ({search, page}) => api.get('products;vms;kd', {params: {search, page}})
export const fetchExchangeRates = () => api.get('currencies')
export const fetchShops = () => api.get('shops')
export const fetchCategories = (lang) => api.get('categories', {params: {lang}})
export const fetchPage = (link) => api.get('page', {params: {link}})
export const fetchPrice = (article, provider) => api.get('price', {params: {article: encodeURI(article), provider}})
