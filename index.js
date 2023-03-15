import express from 'express';
import multer from 'multer';
import cors from "cors"
import mongoose from 'mongoose';
import { registerValidation, loginValidation,postCreateValidation } from './validations.js';



import checkAuth from './utils/checkAuth.js';
import * as UserController from './controllers/UserController.js';
import * as PostController from './controllers/PostController.js';
import handleValidationErrors from './utils/handleValidationErrors.js';

mongoose
  .connect('mongodb+srv://admin:123@cluster0.ti0bztk.mongodb.net/blog?retryWrites=true&w=majority')
  .then(() => {
    console.log('Db ok');
  })
  .catch((err) => {
    console.log('Db error', err);
  });
const storage = multer.diskStorage({
  destination: (_,__, cb) => {
    cb(null, "uploads")
  },
  filename: (_,file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({storage})
const app = express();
app.use(express.json());
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.post('/auth/login',  loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/me', checkAuth, UserController.getMe);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);

app.post("/upload", checkAuth, upload.single("image"), (req, res)=> {
  res.json({
    url: `/uploads/${req.file.originalname}`
  })
})

app.get("/posts/:id", PostController.getOne)
app.get("/posts-popular", PostController.sortPopular)
app.get("/posts-news", PostController.sortNews)
app.get("/posts", PostController.getAll)
app.get("/tags", PostController.getLastTags)
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete("/posts/:id", checkAuth, PostController.remove)
app.patch("/posts/:id",checkAuth, postCreateValidation, handleValidationErrors, PostController.update)


app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server Ok');
});
