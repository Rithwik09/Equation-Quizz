const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('rithu', 10); 

    await prisma.user.create({
        data: {
            email: 'Admin@email.com',
            name: 'Admin',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });

    console.log('Admin user created');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
