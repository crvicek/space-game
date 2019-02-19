import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import * as socketio from 'socket.io';
import { Server } from 'http';

@Controller()
export class UserController {
  
  @Get("/")
  startSocketIo() {
    return "This action returns all users";
  }
}