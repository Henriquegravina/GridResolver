// Author: Henrique B. Gravina
// This code is a base webserver to GridResolver class.
// 2023/03/02

// DxccResolver
const { GridResolver } = require('./GridResolver.js');
const GridR = new GridResolver();

//WebService:
const express = require("express");
const app = express();

// Resolv by Callsign
app.get("/grid/:grid", (req, res) => {
  const { grid } = req.params;
  const result = GridR.latLonForGrid(grid);
  res.json(result);
});

app.listen(3000, () => {
  console.log("Server running on http://127.0.0.1:3000");
});
