import prisma from '../libs/prisma.ts'
 
export const perfumeService = {
    createPerfume : async ({name, description, brandId, variants}) => {
        const newPerfume = await prisma.perfume.create({
            data: {
                name,
                description,
                brandId,
                variants: {
                    create: variants.map((v) => ({
                        size: v.size,
                        price: v.price,
                        concentrate: v.concentrate
                    }))
                }
            } 
        })

        return newPerfume
    }

} 


