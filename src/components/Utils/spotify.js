import axios from 'axios';

//this is the axios instance for all the Spotify fetches
const spotify = axios.create({
    baseURL: `https://api.spotify.com/v1/`,
});
export default spotify