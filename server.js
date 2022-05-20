/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// 'use strict';

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const User = require("./models/user.model");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Databse connection established");
});

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.get("/", async (req, res) => {
  const data = await User.find({});

  res.send(data);
});
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
