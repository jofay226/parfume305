import prisma from '../libs/prisma.ts'
 
export const brandService = {
    createBrand: async (brandName: string) => {
        const newBrand = await prisma.brand.create({
            data: {
                name: brandName
            }
        })
        return newBrand
    },
    getAllBrands: async () => {
        const brands = await prisma.brand.findMany({})
        return brands
    }
} 


