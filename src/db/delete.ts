import {  PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

async function mainDelete() {
    try {
        const worker = await prisma.worker.delete({
           where:{
            id: 1 
           }
        });
        console.log(worker)
    } catch {
        console.log('Cannot delete worker')
    }
}
mainDelete().then(() => process.exit(0))