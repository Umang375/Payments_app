"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function p2pTransfer(to : string, amount: number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if(!from){
        return {
            message : "Error While seding transfer. Please login again"
        }
    }

    const toUser = await prisma.user.findFirst({
        where:{
            number : to
        }
    })
    
    if(!toUser){
        return{
            message : "user not found"
        }
    }

    await prisma.$transaction(async(txn) =>{
        
        await txn.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

        const fromBalance = await txn.balance.findUnique({
            where:{
                userId: Number(from)
            }
        });
        if(!fromBalance || fromBalance.amount < amount){
            throw new Error("Insufficient Balance");
        }
        // await new Promise(r => setTimeout(r, 4000))
        //lock the db
        // In postgres, a transaction ensure that either all the statements happen or none. It does not lock rows/ revert a transaction if something from this transaction got updated before the transaction committed (unlike MongoDB).So we need to explicitly lock the balance row for the sending user so that only one transaction can access it at at time, and the other one waits until the first transaction has committed

        await txn.balance.update({
            where : {userId : Number(from)},
            data: { amount: { decrement: amount } },
        });

        await txn.balance.update({
            where : {userId : Number(to)},
            data: { amount: { increment: amount } },
        });
    });
}