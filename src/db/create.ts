import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function mainCreate() {
    try {
        const worker = await prisma.worker.create({
            data: {
                firstName: 'Domenic',
                lastName: 'Croff',
                birthDate: '10/03/1976',
                email: 'domenic.croff@gmail.com',
                addressWorker: {
                    create: {
                        city: 'Manchester',
                        postCode: '9891',
                        street: 'main street',
                    },
                },
                profile: {
                    create: {
                        role: 'macchine operator',
                        annualSalary: 26000,
                    }
                }
            },
            include: {
                addressWorker: true,
                profile: true
            }
        });
        console.log(worker)
    } catch {
        console.log('Worker already create')
    };
};
mainCreate().then(() => process.exit(0));
