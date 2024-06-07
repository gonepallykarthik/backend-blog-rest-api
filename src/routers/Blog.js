const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const User = require("../models/UserSchema");
const Blog = require("../models/BlogSchema");
const multer = require("multer");

const uploads = multer({
  fileFilter(req, file, cb) {
    // restrict the user to upload certain file types like -> jpg, jpeg, and png
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb("Please upload a image! allowed file type jpg, jpeg, png");
    }
    cb(undefined, true);
  },
  limits: {
    fileSize: 2000000,
  },
});

// POST create a new Blog!
router.post(
  "/api.vizmo/v1/blog",
  auth,
  uploads.array("images"),
  async (req, res) => {
    const { title, description } = req.body;
    const files = req.files;

    // Check if the author exists
    const author = await User.findById(req.user._id);
    if (!author) {
      return res.status(400).send({ error: "Invalid author ID" });
    }

    const images = files.map((file) => ({
      data: file.buffer,
      contentType: file.mimetype,
    }));

    const newblog = new Blog({
      title,
      description,
      images,
      author: req.user._id,
    });

    try {
      await newblog.save();
      const blog_obj = {
        title,
        description,
      };
      res.status(201).send(blog_obj);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// GET all Blogs!
// filter by title

router.get("/api.vizmo/v1/blogs", auth, async (req, res) => {
  const { title } = req.query;
  let query = {};

  if (title) {
    // filter by title
    query.title = { $regex: new RegExp(title, "i") };
  } else {
    // when no filter are applied it will fetch all the blogs for that particular user
    query.author = req.user._id;
  }

  try {
    const blogs = await Blog.find(query);

    if (!blogs.length) {
      return res.status(200).send("No blogs found.");
    }

    res.status(200).send(blogs);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET Blog get ID
router.get("/api.vizmo/v1/blog/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({
      _id: id,
      author: req.user._id,
    });
    if (!blog) {
      return res.status(404).send({ error: "No blog found!" });
    }

    res.status(200).send(blog.toJSON());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PATCH update the Blog by its ID
router.patch("/api.vizmo/v1/blog/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowed_updates = ["title", "description"];
  const isValidUpdate = updates.every((update) =>
    allowed_updates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send("Invalid updates");
  }

  try {
    const updated_blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!updated_blog) res.status(404).send();

    updates.forEach((update) => {
      updated_blog[update] = req.body[update];
    });
    await updated_blog.save();
    res.status(200).send(updated_blog.toJSON());
  } catch (error) {
    res.status(400).send();
  }
});

// DELETE delete a Blog by their id
router.delete("/api.vizmo/v1/blog/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!blog) {
      return res.status(404).send({ error: "No blog found!" });
    }

    res.status(200).send(blog.toJSON());
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
