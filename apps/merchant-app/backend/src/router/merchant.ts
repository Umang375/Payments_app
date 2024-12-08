import { Router } from "express";
import {PrismaClient} from '@prisma/client';
import jwt from 'jsonwebtoken';
import { JWT_PASS } from "../config";

export const merchantRouter = Router();
const prismaClient = new PrismaClient(); // ideally should create the singleton instance of the prisma client refer other projects

merchantRouter.post('/signup', async(req, res) => {
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

merchantRouter.post('/signin', async(req, res) => {
    const {username, password} = req.body;
    const merchant = await prismaClient.merchant.findFirst({
        where: {
            username,
            password
        }
    })
    if(!merchant){
        res.status(403).json({message: "Invalid username or password"});
    }
    const token = jwt.sign({merchantId: merchant.id}, JWT_PASS);

    res.json({token});
  });