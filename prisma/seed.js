const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function patients() {
    const createMany = await prisma.patients.createMany({
        data: [
            {
                surname: "Иванов",
                name: "Иван"
            },
        ],
        skipDuplicates: true
    }
    );
}

async function statistics() {
    const createMany = await prisma.statistics.createMany({
        data: [
            {
                pulse: 80,
                time: new Date(2023,9,20,12,0,20),
                patient_id: 1
            },
            {
                pulse: 88,
                time: new Date(2023,9,20,13,0,21),
                patient_id: 1
            },
        ],
        skipDuplicates: true
    }
    );
}


// patients()
//     .then(async () => {
//         await prisma.$disconnect()
//     })
//     .catch(async (e) => {
//         console.log(e);
//         await prisma.$disconnect();
//         process.exit(1);
//     })

statistics()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })