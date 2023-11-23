import axios from 'axios';


const dataApi = axios.create({
    baseURL: 'https://martiolo.xyz/api'
});



export default dataApi;