/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// 'use strict';

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const Post = require("./models/post.model");
// Constants
const PORT = process.env.PORT;
// const HOST = "0.0.0.0";

// App
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const dataUploaded = await Post.find({});

  res.send(dataUploaded);
});

app.listen(PORT, () => {
  console.log(`server is running on port - ${PORT}`);
});

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Db connected");
});

const userRouter = require("./routes/user");

app.use("/user", userRouter);
