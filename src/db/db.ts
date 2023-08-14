import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function printWorker() {
    const workers = await prisma.worker.findMany();
    console.log(workers)
}

printWorker().then(() => process.exit(0));