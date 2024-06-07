const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config({ path: "./.env" });
require("./db/mongoose");
const userRouter = require("./routers/user");
const BlogRouter = require("./routers/Blog");

// parse incoming json
app.use(express.json());

// user router
app.use(userRouter);

//Blog router
app.use(BlogRouter);

// server connection
app.listen(port, () => {
  console.log("server running on ", port);
});
