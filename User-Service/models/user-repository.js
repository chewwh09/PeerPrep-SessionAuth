const User = require("./user-orm");

const registerNewUser = async (userInformation) => {
  const newUser = new User(userInformation);

  await newUser.save();

  return newUser;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findByCredentials(email, password);
  return user;
};

const updateProfile = async (updatesObject, user) => {
  const updates = Object.keys(updatesObject);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return { error: "Invalid updates" };
  }

  const updatedUser = await User.findOne({ email: user.email });
  updates.forEach((update) => (updatedUser[update] = updatesObject[update]));
  await updatedUser.save();
  return updatedUser;
};

const deleteUser = async (user) => {
  const deletedUser = await User.findOneAndDelete({ email: user.email });
  return deletedUser;
};

module.exports = { registerNewUser, loginUser, updateProfile, deleteUser };
