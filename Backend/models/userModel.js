import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import Joi from "joi";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: true,
    },
    oppGender: {
      type: String,
      required: true,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cpassword: {
      type: String,
      required: true,
    },
    isblocked: {
      type: Boolean,
      required: true,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    premium:{
      type:String,
      default:null
    },
    favourites: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        default: null,
      },
    ],
    incomingrequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        default: null,
      },
    ],
    sentrequests: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        default: null,
      },
    ],
    friends: [
      {
        type: mongoose.Schema.ObjectId,
        ref:"User",
        default: null,
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // const salt= await bcrypt.getSalt(10)
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

// const validate = (user) => {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(255).required(),
//     email: Joi.string().email().required(),
//   });
//   return schema.validate(user);
// };

export default User;
