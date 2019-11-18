const express = require("express");
const bodyParser = require("body-parser"); //ova i dozvoluva da procitame sto ima klientot isprateno
const config = require("./config/index.js");
const DBconn = require("./db/connection"); //povrzi ja so fajlot
const filmovi = require("./handlers/filmovi");

var c = config.getConfig("db");
// console.log(c);

DBconn.init(c); //i ovde se povikuva funkcijata  //ova c go isprakame na db connection  init
const api = express(); //pa pota se potkreva api

api.use(bodyParser.json());

api.get("/api/v1/filmovi", filmovi.getAll); //v1 e version 1 a dokolku sakame druga verzija go pravime v2 itn
api.get("/api/v1/filmovi/:id", filmovi.getOne);
api.post("/api/v1/filmovi", filmovi.save);
api.put("/api/v1/filmovi/:id", filmovi.replace);
api.patch("/api/v1/filmovi/:id", filmovi.update);
api.delete("/api/v1/filmovi/:id", filmovi.remove);

api.listen(8080, err => {
  if (err) {
    console.log("could not start server");
    return;
  }
  console.log("server started successfully on port 8080");
});
