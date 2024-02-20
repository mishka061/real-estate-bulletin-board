"use strict";
import express from "express";
import expressHandlebars from "express-handlebars";
import __dirname from "./__dirname.js";
import mongodb from "mongodb";
import path from 'path';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import multer from "multer";
import { messagesErrors } from "./src/messengers/messagesErrors.js";
import { getRegistration, postRegistration } from "./src/rout/registration.js";
import { getAuthorisation, postAuthorisation } from "./src/rout/authorization.js";
import { getHome, postSearch } from "./src/rout/home.js";
import { getAddAdvert, postAddAdvert } from "./src/rout/addAdvert.js";
import { getAnnouncementPage, postAnnouncementPage } from "./src/rout/announcementPage.js";
import { getProfile } from "./src/rout/profile.js";
import { getEdit, postEdit } from "./src/rout/edit.js";
import { getDelete } from "./src/rout/delete.js";
import { getWriteToSeller, postWriteToSeller } from "./src/rout/writeToSeller.js";
import { getChannel, postChannel } from "./src/rout/channel.js";

const handlebars = expressHandlebars.create({
  defaultLayout: "main",
  extname: "hbs",
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 === arg2 ? options.fn(this) : options.inverse(this);
    },
    eq: function (arg1, arg2) {
      return arg1 === arg2;
    },
    isArray: Array.isArray,
  },
});

let app = express();
app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views/")); 

app.use(express.static(__dirname + "/dist/"));
app.use(express.static(__dirname + "/dist/images/"));
app.use(express.static(__dirname + "/dist/img/layout/"));
app.use(express.static(__dirname + "/dist/img/photos/"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "imgLabel[]" || file.fieldname === "imgLabelEdit[]") {
      cb(null, "public/img/layout/");
    } else if (file.fieldname === "image[]" || file.fieldname === "imageEdit[]") {
      cb(null, "public/img/photos/");
    } else {
      cb(new Error("Unexpected fieldname"));
    }
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const multerMiddleware = multer({ storage: storage }).fields([
  { name: "imgLabel[]", maxCount: 5 },
  { name: "image[]", maxCount: 20 },
  { name: "imgLabelEdit[]", maxCount: 5 },
  { name: "imageEdit[]", maxCount: 20 },
]);

let mongoClient = new mongodb.MongoClient("mongodb://127.0.0.1:27017/");
try {
  let mongo = await mongoClient.connect();
  let db = mongo.db("real-estate-listings");
  let usersdb = db.collection("users");
  let apartamentsdb = db.collection("apartments");
  let messengerdb = db.collection("messenger");

  app.get("/registration", async function (req, res) {
    await getRegistration(req, res);
  });
  app.post("/registration", async function (req, res) {
    await postRegistration(req, res, usersdb);
  });
  app.get("/authorization", async function (req, res) {
    await getAuthorisation(req, res, usersdb);
  });
  app.post("/authorization", async function (req, res) {
    await postAuthorisation(req, res, usersdb);
  });
  app.get("/", async function (req, res) {
    await getHome(req, res, usersdb, apartamentsdb);
  });
  app.post("/", async function (req, res) {
    await postSearch(req, res, usersdb, apartamentsdb);
  });
  app.get("/addAdvert", async function (req, res) {
    await getAddAdvert(req, res, usersdb, apartamentsdb);
  });
  app.post("/addAdvert", multerMiddleware, async function (req, res) {
    await postAddAdvert(req, res, usersdb, apartamentsdb);
  });
  app.get("/apartaments/:id", async function (req, res) {
    await getAnnouncementPage(req, res, usersdb, apartamentsdb);
  });
  app.post("/apartaments/:id", async function (req, res) {
    await postAnnouncementPage(req, res, usersdb, apartamentsdb, messengerdb);
  });
  app.get("/profile", async function (req, res) {
    await getProfile(req, res, usersdb, apartamentsdb);
  });
  app.get("/edit/:id", async function (req, res) {
    await getEdit(req, res, usersdb, apartamentsdb);
  });
  app.post("/edit/:id", multerMiddleware, async function (req, res) {
    await postEdit(req, res, usersdb, apartamentsdb);
  });
  app.get("/messenger/channel/:id", async function (req, res) {
    await getChannel(req, res, usersdb,messengerdb);
  });
  app.post("/messenger/channel/:id", async function (req, res) {
    await postChannel(req,res,usersdb,apartamentsdb,messengerdb);
  });
  app.get("/messenger", async function (req, res) {
    await getWriteToSeller(req,res,usersdb,messengerdb);
  });
  app.post("/messenger", async function (req, res) {
    await postWriteToSeller(req, res, usersdb, messengerdb);
  });
  app.get("/delete/:id", async function (req, res) {
    await getDelete(req, res, usersdb, apartamentsdb);
  });
} catch (err) {
  console.error(err, "no connected db");
}

app.use(function (req, res) {
  res.status(404).render("404", {
    layout: "404",
    title: messagesErrors.errors.titleError,
  });
});

app.listen(3000, function () {
  console.log("running");
});
