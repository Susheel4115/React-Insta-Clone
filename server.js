/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// 'use strict';

const express = require("express");
require("dotenv").config();
const cors = require("cors");

// Constants
const PORT = process.env.PORT;
// const HOST = "0.0.0.0";

// App
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello remote world!\n");
});

app.listen(PORT, () => {
  console.log(`server is running on port - ${PORT}`);
});
