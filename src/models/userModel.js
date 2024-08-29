// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: [true, "Please provide a username"],
//     unique: true,
//   },
//   email: {
//     type: String,
//     required: [true, "please provide  user name"],
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: [true, "please provide  userPassword"],
//     unique: true,
//   },
//   isVerified: {
//     type: Boolean,
//     default: false,
//   },
//   isAdmin: {
//     type: Boolean,
//     default: false,
//   },
//   forgotPasswordToken: String,
//   forgotPasswordTokeExpiry: Date,
//   verifyToken: String,
//   verifyTokenExpiry: Date,
// });

// const User = mongoose.model.users || mongoose.model("users", userSchema);
// export default User;
import mongoose from "mongoose";

// Check if the model is already defined to avoid OverwriteModelError
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
