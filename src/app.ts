//Declaration
import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import multer, { FileFilterCallback } from 'multer';

// Load environment variables
dotenv.config();

//img variables
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, "..", "images"));
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(
      null,
      new Date().toISOString().replace(/\:/g, "-").replace(/\./g, "-")
       + "-" +
        file.originalname
    );
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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
import userRoutes from './Routes/user';
import authRoutes from './Routes/auth';
import generalRoutes from './Routes/general';
import serviceRoutes from './Routes/service';
import managementRoutes from './Routes/management';

//Create Server
const app: Express = express();

//connect database
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URL || '')
  .then(() => {
    console.log("Data base connected");
  })
  .catch((err) => {
    console.log("database failed");
  });

//Middle Wares
//first MW  method, url
app.use(morgan("tiny"));

//Second MW CORS
// app.use(cors());
app.use((request: Request, response: Response, next: NextFunction) => {
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
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(multer({ storage, fileFilter }).fields([
  { name: 'logo', maxCount: 1 },
  { name: 'media', maxCount: 10 },
  { name: 'image', maxCount: 1 }
]))

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

////////////////////////////////Routers//////////////////////////////////
app.use('/user', userRoutes);
app.use('/auth', authRoutes);
app.use('/general', generalRoutes);
app.use('/service', serviceRoutes);
app.use('/management', managementRoutes);

//General middleware for not Found url pathes
app.use((req: Request, res: Response) => {
  res.status(404).json({ data: "Not Found" });
});

//Error handling middleware that will catch all system Errors
interface CustomError extends Error {
  status?: number;
}

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let status = err.status || 500;
  res.status(status).json({ Error: err + " " });
});

export default app;
