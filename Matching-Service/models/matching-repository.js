const Matching = require("./matching-orm");

const matchUsers = async ({ username, difficulty, roomId }) => {
  try {
    const { match, error } = await Matching.findMatchingRoom(difficulty);

    if (error) {
      const newRecord = new Matching({
        roomId,
        usernameOne: username,
        usernameTwo: "",
        difficulty,
      });
      await newRecord.save();

      return newRecord;
    }

    match.usernameTwo = username;
    return match;
  } catch (e) {
    console.log("Matching users function throws an error", e);
  }
};

const deleteMatchRecord = async ({ roomId, username }) => {
  const { match, error } = await Matching.deleteRoomByRoomIdAndName(
    roomId,
    username
  );
  if (error) throw Error();

  return match;
};

module.exports = { matchUsers, deleteMatchRecord };
