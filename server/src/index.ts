import 'reflect-metadata';
import { createKoaServer, Get, useKoaServer } from "routing-controllers";
import database from './db';
import * as socketio from 'socket.io';
import { Server } from "http";
import * as Koa from 'koa';


const port = process.env.PORT || 4000;

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = socketio(server);

useKoaServer(app, {
  cors: true,
});

io.on('connection', () => {
  console.log('Socket.io connection: client connected.');
});

io.on('player action', msg => {
  
});

server.listen(port);
//
// database()
//   .then(() => {
//     server.listen(port);
//   });
