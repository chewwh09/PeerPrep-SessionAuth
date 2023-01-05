const socketio = require("socket.io");
const axios = require("axios");

const {
  GET_RANDOM_QUESTION_URL,
  USER_HISTORY_URL,
  MATCHING_URL,
} = require("../routes/routes");
const {
  initiateQueue,
  disconnectQueue,
  sendMessage,
} = require("../activemq/messageQueue");
const { socketAuthenticate } = require("../middleware/auth");
const redisSession = require("../db/redis");
const { SOCKET_EVENTS } = require("../utils/constants");

const initiateSocket = (server) => {
  const io = socketio(server);

  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);

  io.use(wrap(redisSession));

  io.use(socketAuthenticate);

  io.on(SOCKET_EVENTS.CONNECTION, (socket) => {
    console.log(`A new WebSocket ${socket.id} has connected!`);

    const cookie = socket.handshake.headers.cookie;
    var client = initiateQueue(socket, socket.request.username);

    socket.on(SOCKET_EVENTS.FIND_MATCH, (data) => {
      console.log("FIND MATCH EVENT");
      socket.join(SOCKET_EVENTS.WAITING_ROOMS);
      sendMessage(client, data);
      // SEND MESSAGE TO QUEUE TO FIND ANY MATCH
    });

    socket.on(SOCKET_EVENTS.TIMEOUT, async (data) => {
      try {
        await axios.delete(MATCHING_URL, {
          headers: { cookie },
          data,
        });
      } catch (e) {
        console.log("Unable to delete the matching!");
      }
    });

    socket.on(SOCKET_EVENTS.JOIN_ROOM, async ({ roomId }) => {
      socket.leave(SOCKET_EVENTS.WAITING_ROOMS);
      socket.join(roomId);
    });

    socket.on(
      SOCKET_EVENTS.GET_QUESTION,
      async ({ usernameOne, usernameTwo, roomId, difficulty }) => {
        try {
          const response = await axios.get(
            `${GET_RANDOM_QUESTION_URL}/${difficulty}`,
            {
              headers: { cookie },
            }
          );

          io.to(roomId).emit(SOCKET_EVENTS.UPDATE_QUESTION, response.data);

          await axios.post(
            USER_HISTORY_URL,
            {
              usernameOne,
              usernameTwo,
              questionDifficulty: difficulty,
              questionTitle: response.data.questionTitle,
              questionContent: response.data.questionContent,
            },
            {
              headers: { cookie },
            }
          );
        } catch (e) {
          console.log("Unable to get question / save the users' history");
        }
      }
    );

    socket.on(SOCKET_EVENTS.CODE, ({ roomId, code }) => {
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.UPDATE_CODE, code);
    });

    socket.on(SOCKET_EVENTS.LEAVE_ROOM, ({ roomId }) => {
      socket.leave(roomId);
      socket.broadcast.to(roomId).emit(SOCKET_EVENTS.PARTNER_LEAVE_ROOM, {
        message: "Your coding buddy has left the room.",
      });
    });

    socket.on(SOCKET_EVENTS.DISCONNECT, () => {
      console.log(`A WebSocket ${socket.id} has disconnected!`);
      disconnectQueue(client);
      client = null;
    });
  });
};

module.exports = initiateSocket;
