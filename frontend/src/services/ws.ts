import { io } from 'socket.io-client';
export const socket = io('http://DEIN_BACKEND:3050');
//speichert die Websocket-Verbindung zum Backend