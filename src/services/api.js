import axios from 'axios';

const api = axios.create({
    baseURL: 'https://back-controlefinanceiro-production.up.railway.app/users'
})
 
export default api;