import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json())
const prisma = new PrismaClient();

// GET LIST
app.get('/', async (req, res) => {
    try {
        const workersList = await prisma.worker.findMany({
            include: {
                addressWorker: true,
            }
        });
        if (!workersList) {
            return res.status(404).send({ msg: 'List not found' })
        }
         return res.status(200).send(workersList)
    } catch{
        return res.status(500).send({ msg: 'Error' })
    } 
})


// GET BY ID
app.get('/worker/:id', async (req, res) => {
    const params = req.params;
    const id = Number(params['id']);
    try {
        const worker = await prisma.worker.findFirst({
            where: {
                id: id,
            },
            include:{
                addressWorker:true
            }

        });
        if(!worker){
            return res.status(404).send({msg: 'Worker not found'})
        }
        return res.status(200).send(worker)
    } catch{
        return res.status(500).send({msg: 'Error'})
    }
   
})


// CREATE
app.post('/worker/', async (req, res) => {
    const body = req.body;
   
    try {
        const worker = await prisma.worker.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                birthDate: body.birthDate,
                email: body.email,
                role: body.role,
                annualSalary: body.annualSalary,
                addressWorker: {
                    create: {
                        city: body.city,
                        postCode: body.postCode,
                        street: body.street,
                    }
                },
            },
        });
         return res.status(201).send(worker)
    } catch {
        return res.status(500).send({ msg: 'Cannot create worker' })
    };
});


// UPDATE
// edit Worker
app.put('/worker/:id', async (req, res) => {
    const body = req.body;
    const params = req.params;
    const id = Number(params['id']);

    const worker = await prisma.worker.findFirst({
        where: {
            id: id
        }
    })
    if (!worker) {
        return res.status(404).send({ msg: 'not found' })
    }
    try {
        const editWorker = await prisma.worker.update({
            where: {
                id: id,
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                birthDate: body.birthDate,
                email: body.email,
                role: body.role,
                annualSalary: body.annualSalary,
                
            },
        })
        return res.status(200).send(editWorker)
    } catch {
        return res.status(304).send({ msg: 'Cannot edit worker' })
    };
})

// edit AddressWorker
app.put('/addressworker/:id', async (req, res) => {
    const body = req.body;
    const params = req.params;
    const id = Number(params['id']);

    try {
        const editAddressWorker = await prisma.addressWorker.update({
            where: {
              id_workerId:{
                id: id,
                workerId: id
              }
            },
            data: {
                city: body.city,
                postCode: body.postCode,
                street: body.street,
            },
        })
        return res.status(200).send(editAddressWorker)
    } catch {
        return res.status(304).send({ msg: 'Cannot edit worker' })
    };
})


//DELETE
app.delete('/worker/:id', async (req, res) => {
    const params = req.params;
    const id = Number(params['id']);

    try {
        const worker = await prisma.worker.delete({
            where: {
                id: id
            },
            include: {
                addressWorker: {
                    where:{
                        workerId: id
                    }
                }
            }
        });
        return res.status(200).send(worker)
    } catch {
        return res.status(404).send({ msg: 'Cannot delete worker' })
    }
})


const port = 4000;
app.listen(port, () => {
    console.log(`app is running on http://localhost:${port}`)
})