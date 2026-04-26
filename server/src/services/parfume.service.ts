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
    },
    getPerfumes: async (filters) => {
        const searchFilters = {
            ...(filters.size && {size: filters.size} ),
            ...(filters.concentrate && {concentrate: filters.concentrate})
        }
        const perfumes = await prisma.perfume.findMany({
            where: {
                ...(filters.brandId && {brandId: filters.brandId}),
                variants: {
                    some : searchFilters
                }
            },
            include: {
                variants: {
                    where: searchFilters
                }
            }
        })
        return perfumes
    }
} 


