<<<<<<< HEAD
import express from 'express';
import db from '@repo/db/client'

const app = express();

app.post("/hdfcWebHook", async(req, res) => {
    //TODO: Add zod validation here?
    //addd a webhook secert to validate a request came from the bank
    const paymentInformation = {
=======
import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
>>>>>>> migration
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

<<<<<<< HEAD
    //increment function will handle the parallel well instead of just the "update" nomral "balance + amount" because this will just update "0+200" and "0+400" the balance will be 400 but with increment it will be 600

    //transaction
    try {
        await db.$transaction([
            db.balance.updateMany({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount: {
                        increment:  Number(paymentInformation.amount)
                    }
                }
            }),
        
            db.onRampTransaction.updateMany({
                where:{
                    token : paymentInformation.token,
                },
                data:{
                    status : "Success"
=======
    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
>>>>>>> migration
                }
            })
        ]);

        res.json({
            message: "Captured"
<<<<<<< HEAD
        }) 
    } catch (e) {
=======
        })
    } catch(e) {
>>>>>>> migration
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);