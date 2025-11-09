import http from 'http';
import WebSocket,{WebSocketServer} from 'ws';

const server = http.createServer((req,res) => {
    console.log((new Date())+"received request for "+req.url);
    res.end("hello world\n");
})

const wss = new WebSocketServer({server});

wss.on("connection", function connection(ws){
    ws.on("error", console.error)

    ws.on("message", function message(data) {

      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data.toString()); 
        }
      });
    });
    

    ws.send("hello! connection message form ws server")
})

const PORT = 3000;
server.listen(PORT, () => {
    console.log((new Date())+`Server is listening on port ${PORT}`);
});