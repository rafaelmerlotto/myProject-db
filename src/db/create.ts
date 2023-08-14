import { PrismaClient } from "@prisma/client";




const prisma = new PrismaClient();

async function mainCreate() {
    try {
        const worker = await prisma.worker.create({
            data: {
                firstName: 'Oliver',
                lastName: 'Gas',
                birthDate: '15/10/1980',
                email: 'oliver.gas@gmail.com',
                addressWorker: {
                    create: {
                        city: 'london',
                        postCode: '9721',
                        street: 'Saint marth',
                    },
                },
                profile: {
                    create: {
                        role: 'Operator security',
                        annualSalary: 30000,
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
