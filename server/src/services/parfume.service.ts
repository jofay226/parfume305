import prisma from '../libs/prisma.ts'
 
export const perfumeService = {
    createPerfume : async (payload) => {
        const newPerfume = await prisma.perfume.create({
            data: {
                name: "test",
                description: "test test test test test",
                brandId: "1",
                variants: {
                    create: [{
                        size: 50,
                        price: 50,
                        concentrate: "PERFUME"
                    },
                    {
                        size: 100,
                        price: 100,
                        concentrate: "EAU DE Perfume",
                    },
                    {
                        size: 150,
                        price: 150,
                        concentrate: "EAU DE Toilette",
                    }]
                }
            }
        })

        return newPerfume
    }

} 


