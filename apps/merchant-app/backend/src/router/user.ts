import { Router } from "express";   

export const userRouter = Router();

userRouter.post('/signup', (req, res) => {
  const {username, password, name} = req.body;
  try{
      await prismaClient.merchant.create({
          data: {
              username,
              password,
              name
          }
      })
      res.json({message: "Merchant created successfully"});
  }catch(err){
      res.status(403).json({message: "Something went wrong"});
  }
});

userRouter.post('/signin', (req, res) => {
    res.send('Hello World!');
  });

