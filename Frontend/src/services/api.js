import axios from 'axios';

const API_URL = 'http://localhost:5266/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Agregar token a cada request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;

// ========== AUTH ==========
export const authService = {
    login: async (email, password) => {
        const response = await api.post('/Auth/login', { email, password });
        return response.data;
    },
    register: async (data) => {
        const response = await api.post('/Auth/register', data);
        return response.data;
    },
};

// ========== PRODUCTOS ==========
export const productService = {
    getAll: async () => {
        const response = await api.get('/Products');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/Products/${id}`);
        return response.data;
    },
};

// ========== CATEGORÍAS ==========
export const categoryService = {
    getAll: async () => {
        const response = await api.get('/Categories');
        return response.data;
    },
};

// ========== CARRITO ==========
export const cartService = {
    getCart: async () => {
        const response = await api.get('/Cart');
        return response.data;
    },
    addToCart: async (variantId, quantity) => {
        const response = await api.post('/Cart', { variantId, quantity });
        return response.data;
    },
    updateCartItem: async (cartItemId, quantity) => {
        const response = await api.put('/Cart', { cartItemId, quantity });
        return response.data;
    },
    removeCartItem: async (cartItemId) => {
        await api.delete(`/Cart/${cartItemId}`);
    },
    clearCart: async () => {
        await api.delete('/Cart/clear');
    },
};