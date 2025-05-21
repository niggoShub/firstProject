import axios from 'axios';
export const api = axios.create({ baseURL: 'http://DEIN_BACKEND:3050/api' });
//speichert die REST-API Verbindung zum Backend