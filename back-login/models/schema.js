const { Schema, model } = require("mongoose");
const emailVerify = require("../tools/emailVerify");
const bcrypt = require("bcryptjs");

const loginSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    username: {
      type: String,
      required: [true, "Please provide an Username"],
      unique: [true, "Username is already used by someone else"],
    },
    email: {
      type: String,
      required: [true, "Please provide an Email"],
      unique: [true, "Email is already used by someone else"],
      validate: {
        validator: emailVerify,
        message: "Email can't be used",
      },
    },
    password: { type: String, required: [true, "Please provide a password"] },
    favorites : {type:Array},
    createAt: { type: Date, default: Date.now, immutable: true },});

  loginSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
  });
  
  loginSchema.methods.passwordCorrect = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
  };
  
  module.exports = model("User", loginSchema);