import { Router } from "express";   

export const userRouter = Router();

userRouter.post('/signup', (req, res) => {
  res.send('Hello World!');
});

userRouter.post('/signin', (req, res) => {
    res.send('Hello World!');
  });

