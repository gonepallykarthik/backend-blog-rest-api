const mongoose = require("mongoose");
const User = require("./UserSchema");

// A blog will have title, can have images, and the content.

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Tittle Required!"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Description required! "],
      trim: true,
    },

    images: [
      {
        data: {
          type: Buffer,
          required: true,
        },
        contentType: {
          type: String,
          required: true,
        },
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

BlogSchema.methods.toJSON = function () {
  const blog = this;
  const blogObject = blog.toObject();

  delete blogObject.images;

  return blogObject;
};

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
