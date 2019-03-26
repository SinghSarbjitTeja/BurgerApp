import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-be46c.firebaseio.com/'

})

export default instance;