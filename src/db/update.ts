import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function mainUpdateAddressWorker() {

    try {
        const addressWorker = await prisma.addressWorker.update({
            data: {
                street: 'army',
                postCode: '2732',
                city: 'manchester',
            },
            where: {
                id: 2
            },
        })
        
    } catch {
        console.log('connot find worker')
    };
};
mainUpdateAddressWorker().then(() => process.exit(0));



async function mainUpdateProfile() {
    try {
        const profile = await prisma.profile.update({
            data: {
                role: '',
                annualSalary: 0,  
            },
            where: {
                id: 0
            },
        })
    } catch {
        console.log('connot find user')
    };
};
// mainUpdateProfile().then(() => process.exit(0));