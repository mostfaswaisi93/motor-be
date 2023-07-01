//Declaration
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const body_parser = require("body-parser");
const path = require("path");
const fs = require('fs')

//img variables
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/\:/g, "-").replace(/\./g, "-")
       + "-" +
        file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    //image Extensions
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/webp" ||

    //Videos Extensions
    file.mimetype == "video/mp4"
  )
    cb(null, true);
  else cb(null, false);
};

//Router Declarations
const user = require('./Routes/user')
const auth = require('./Routes/auth')
const general = require('./Routes/general')

//Create Server
const app = express();

//connect database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Data base connected");
    app.listen(process.env.PORT, () => {
      console.log(`Motor-Be Listenining on Port ${process.env.PORT} .......`);
    });
  })
  .catch((err) => {
    console.log("database failed");
  });

//Middle Wares
//first MW  method, url
app.use(morgan("tiny"));

//Second MW CORS
// app.use(cors());
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Methods","GET,POST,DELETE,PUT,OPTIONS");
  response.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

//create folder for images
try {
  if (!fs.existsSync('images')) {
    fs.mkdirSync('images');
  }
} catch (err) {
  console.error(err);
}

//img
app.use("/images", express.static(path.join(__dirname, "images")));
// app.use(multer({ storage, fileFilter }).array("image", 10));
app.use(multer({ storage, fileFilter }).fields([{ name: 'logo', maxCount: 1 }, { name: 'media', maxCount: 10 }]))

//body parser
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

////////////////////////////////Routers//////////////////////////////////
app.use('/user', user)
app.use('/auth' ,auth)
app.use('/general' , general)

//General middleware for not Found url pathes
app.use((req, res) => {
  res.status(404).json({ data: "Not Found" });
});

//Error handling middleware that will catch all system Errors
app.use((err, req, res, nxt) => {
  let status = err.status || 500;
  res.status(status).json({ Error: err + " " });
});
