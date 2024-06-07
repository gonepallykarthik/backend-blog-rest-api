require("dotenv").config({ path: "../../.env" });
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const token_secret = process.env.TOKEN_SECRET;
const Blog = require("./BlogSchema");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: [6, "Password must be greater than 6 characters"],
      // validate function to verify that entered password does not contain "password"
      validate(value) {
        if (value.toLowerCase().includes("password"))
          throw new Error("password cannot be password");
      },
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email required"],
      validate(value) {
        let isValid = validator.isEmail(value);
        if (isValid == false)
          throw new Error("Invalid email! Please enter a valid Email");
      },
    },

    // this profile contains information like bio and avatar but it is optional
    profile: {
      bio: {
        type: String,
        trim: true,
      },
      type: Buffer,
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.virtual("blogs", {
  ref: "Blog",
  localField: "_id",
  foreignField: "author",
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.profile;

  return userObject;
};

//static methods
userSchema.statics.findByCredentials = async (email, pass) => {
  if (email.length == 0 || pass.length == 0)
    throw new Error("please enter email and password");
  const user = await User.findOne({ email });

  // if there is no user with this email
  if (!user) {
    throw new Error("unable to login! No user with this Email");
  }

  // password mismatch
  const isMatch = await bcrypt.compare(pass, user.password);
  if (!isMatch) {
    throw new Error("unable to login please Enter right email and password! ");
  }
  return user;
};

// Instance methods
userSchema.methods.generateToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, token_secret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// hash the password before saving
// pre means before saving the user
userSchema.pre("save", async function (next) {
  // This -> refers to user schema
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// delete all blogs when user is removed
userSchema.pre("save", async function (next) {
  const user = this;
  await Blog.deleteMany({ id: user._id });
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
