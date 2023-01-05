const authenticate = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ status: "Failed", message: "Unauthorized" });
  }
  req.user = user;
  next();
};

const socketAuthenticate = (socket, next) => {
  const session = socket.request.session;
  if (!session || !session.user) return next(new Error("Unauthorized"));
  socket.request.username = session.user.username;
  next();
};

module.exports = { authenticate, socketAuthenticate };
