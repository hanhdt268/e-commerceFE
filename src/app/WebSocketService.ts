import {Injectable} from "@angular/core";

var SockJs = require("sockjs-client");
var Stomp = require("stompjs");

@Injectable()
export class WebSocketService {

  // Open connection with the back-end socket
  public connect() {
    console.log("Initialize WebSocket Connection");
    let socket = new SockJs(`http://localhost:8080/wss`);

    let stompClient = Stomp.over(socket);

    return stompClient;
  }
}
