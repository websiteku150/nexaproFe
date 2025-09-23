import axios from 'axios';

const Api = axios.create({
    baseURL: '' 
    // BACKEND URL
})
Api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if(token){
        config.headers['Authorization'] = 'Bearer' + token;
    }
    return config;;
})

export default Api;