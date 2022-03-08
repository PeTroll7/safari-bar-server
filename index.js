const express = require('express');
const app = express();
const { Socket } = require('socket.io');
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ['*'],
});

const hand = require('./cards.js');

const roomsArray = [];
const roomPlayersArray = [];

io.on('connection', (socket) => {
  console.log('user connected');
  //console.log(Array.from(socket.rooms));

  socket.on('amIconected', () =>{
    true;
  })

  socket.on('roomExist', (gameID) => {
    let index = roomsArray.indexOf(gameID);
    if(roomsArray[index] == gameID){
      if(roomPlayersArray[index][roomPlayersArray[index].length-1] != "gameStarted"){
        if(roomPlayersArray[index].length < 4){
          socket.emit('canIConnect', 1); //socket can connect
        } else {
          socket.emit('canIConnect', 2); //socket cannot connect, game is full
        }
      } else {
        socket.emit('canIConnect', 3); //socket cannot connect, game already started
      }
    } else {
      socket.emit('canIConnect', 4);//socket cannot connect, room doesn't exist
    }
   
  });

  socket.on('joinGame', ({ gameID }) => {

    if (!roomsArray.includes(gameID)) {
      roomsArray.push(gameID);
      roomPlayersArray.push([socket.id]);
    } else {
      let id = roomsArray.findIndex((x) => x == gameID);
      if (roomPlayersArray[id].length != 4) {
        roomPlayersArray[id].push(
          socket.id
        );
      }
    }
    
    socket.join(gameID);
    console.log('player joined the room ' + gameID);
    socket.to(gameID).emit('joinGame', {a:roomsArray,b:roomPlayersArray});

    switch (roomPlayersArray[roomsArray.findIndex((x) => x == gameID)].length) {
      case 1: {
        socket.emit('getHand', {hand: hand.hand1, playerID: 1});
        break;
      }
      case 2: {
        socket.emit('getHand', {hand: hand.hand2, playerID: 2});
        break;
      }
      case 3: {
        socket.emit('getHand', {hand: hand.hand3, playerID: 3});
        break;
      }
      case 4: {
        socket.emit('getHand', {hand: hand.hand4, playerID: 4});
        break;
      }
    }

    socket.on('startGame', () => {
      roomPlayersArray[roomsArray.indexOf(gameID)].push("gameStarted");
      io.to(gameID).emit('startGame');
    })

    socket.on('gameUpdate', ({ gameID, gameArray, bar, trash, countOfCards, playerID, logArray }) => {
      io.to(gameID).emit(gameID, {
        gameArray: gameArray,
        bar: bar,
        trash: trash,
        countOfCards: countOfCards,
        playerID: playerID == roomPlayersArray[roomsArray.indexOf(gameID)].length-1 ? 1 : playerID += 1,
        logArray: logArray
      });
    });

    socket.on('sendMessage', (message) =>{
      socket.to(gameID).emit('sendMessage', message);
    })

    socket.on('disconnectMe', () => {
      socket.disconnect();
    })

    socket.on('disconnect', () => {
      if(roomsArray.includes(gameID)){
        io.to(gameID).emit('disconnected',"player has disconnected");
        let index = roomsArray.indexOf(gameID);
        roomsArray.splice(index,1);
        roomPlayersArray.splice(index,1);
      }
    })
  });
});

app.get("/", (req, res) =>{
  res.status(200).json({message: "startOK"})
})


const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log('server is running on port ' + PORT));
