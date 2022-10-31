const User = require("../models/schema");
const jwt = require("jsonwebtoken");
const messageError = require("../tools/messageError");

function generateToken({ _id }) {
  return jwt.sign({ id: _id }, process.env.JWT_SECRET);
}
// register 
exports.register = async (req, res, next) => {
  try {
    console.log("got here")
    const newUser = await User.create(req.body);
    console.log(newUser)
    newUser.password = undefined;
    const token = generateToken(newUser);
    console.log(token)
    res.status(201).json({ token });
  } catch (error) {
    console.log(error)
    next(new messageError("Register failed", 400));
  }
};

// login that cheek if the combination of password and username was register 
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      next(new messageError("Please provide username and password", 400));

    const user = await User.findOne({ username });

    if (!user) return next(new messageError("User does't exist", 404));

    if (!(await user.passwordCorrect(password)))
      return next(new messageError("Password doesn't match", 403));

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(new messageError("Something want wrong"));
  }
};

exports.authenticate = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) return next(new messageError("Provide a token", 400));
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED JWT :",decoded)
    // check dans la base de donne if exists
    const user = await User.findById(decoded.id);
    user.password = undefined;
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(new messageError("Something want wrong"));
  }
};

exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(403);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(403);
  }
};