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
    },
    getSingleBrand: async (brandId:string) => {
        const brand = await prisma.brand.findUnique({
            where: {id: brandId}
        })
        return brand
    },
    deleteBrand: async (brandId: string) => {
        const deletedBrand = await prisma.brand.delete({
            where: {id: brandId}
        })
        return deletedBrand
    }
} 


