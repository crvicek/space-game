import 'reflect-metadata';
import { GameServer } from './Server';

const port = process.env.PORT || 4000;

const server = new GameServer();

server.start();