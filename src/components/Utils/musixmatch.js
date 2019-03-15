import axios from 'axios';

//this is the base url for all the music match fetches
const musixmatch = axios.create({
    baseURL: 'https://evening-temple-64997.herokuapp.com/api.musixmatch.com/ws/1.1/',
});
export default musixmatch