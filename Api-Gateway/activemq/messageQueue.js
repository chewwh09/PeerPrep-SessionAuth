const mqtt = require("mqtt");
const uuid = require("uuid");

const {
  ACTIVE_MQ_ENDPOINT,
  ACTIVE_MQ_USERNAME,
  ACTIVE_MQ_PASSWORD,
  ACTIVE_MQ_PORT,
} = require("../config/config");
const { SOCKET_EVENTS, TOPICS } = require("../utils/constants");

const initiateQueue = (socket, username) => {
  let options = {
    username: ACTIVE_MQ_USERNAME,
    password: ACTIVE_MQ_PASSWORD,
    clientId: `publish_${uuid.v1()}`,
    port: ACTIVE_MQ_PORT,
  };

  const client = mqtt.connect(ACTIVE_MQ_ENDPOINT, options);
  client.on("connect", () => {
    client.subscribe(TOPICS.FIND_MATCH_REPLY_TOPIC);
  });

  client.on("message", (topic, res) => {
    if (topic === TOPICS.FIND_MATCH_REPLY_TOPIC) {
      const parsedData = JSON.parse(res.toString());
      if (
        parsedData.usernameTwo !== "" &&
        (parsedData.usernameOne === username ||
          parsedData.usernameTwo === username)
      ) {
        socket.emit(SOCKET_EVENTS.MATCH_FOUND, parsedData);
      }
    }
  });
  return client;
};

const sendMessage = (client, data) => {
  client.publish(TOPICS.FIND_MATCH_TOPIC, JSON.stringify(data));
};

const disconnectQueue = (client) => {
  if (client) {
    console.log("disconnecting queue");
    client.end();
  }
};

module.exports = { initiateQueue, disconnectQueue, sendMessage };
