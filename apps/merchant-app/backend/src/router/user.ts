import { Router } from "express";   
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_USER_PASS } from "../config";

export const userRouter = Router();
const prismaClient = new PrismaClient(); 

userRouter.post('/signup', async(req, res) => {
  const {username, password, name} = req.body;
  try{
      await prismaClient.user.create({
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

userRouter.post('/signin', async (req, res) => {
  const prismaClient = new PrismaClient(); 
  const {username, password} = req.body;
    const user = await prismaClient.user.findFirst({
        where: {
            username,
            password
        }
    })
    if(!user){
        res.status(403).json({message: "Invalid username or password"});
    }
    const token = jwt.sign({id: user.id}, JWT_USER_PASS);

    res.json({token});
  }); 

