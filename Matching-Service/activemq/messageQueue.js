const mqtt = require("mqtt");
const uuid = require("uuid");

const {
  ACTIVE_MQ_ENDPOINT,
  ACTIVE_MQ_USERNAME,
  ACTIVE_MQ_PASSWORD,
  ACTIVE_MQ_PORT,
} = require("../config/config");
const { matchUsers } = require("../models/matching-repository");
const { TOPICS } = require("../utils/constants");

let options = {
  username: ACTIVE_MQ_USERNAME,
  password: ACTIVE_MQ_PASSWORD,
  clientId: `subscribe_${uuid.v1()}`,
  port: ACTIVE_MQ_PORT,
};

const client = mqtt.connect(ACTIVE_MQ_ENDPOINT, options);
client.on("connect", () => {
  client.subscribe(TOPICS.FIND_MATCH_TOPIC);
});

client.on("message", async (topic, res) => {
  console.log("Receive message");
  if (topic === TOPICS.FIND_MATCH_TOPIC) {
    console.log("Receive Message with topic: Match topic");
    const matchData = await matchUsers(JSON.parse(res.toString()));
    client.publish(TOPICS.FIND_MATCH_REPLY_TOPIC, JSON.stringify(matchData));
  }
});
