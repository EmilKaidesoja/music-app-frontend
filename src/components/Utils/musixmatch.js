import axios from 'axios';

//this is the axios instance for all the musixmatch fetches
const musixmatch = axios.create({
    baseURL: `${process.env.REACT_APP_CORS}api.musixmatch.com/ws/1.1/`,
});
export default musixmatch