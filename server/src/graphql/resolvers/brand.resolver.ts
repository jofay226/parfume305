import { brandService } from "../../services/brand.service.ts";

export const brandResolvers = {
  Mutation: {
    createBrand : (_, {param}: { param: {name: string}}) => {
        const newBrand =  brandService.createBrand(param.name)
        return newBrand
    }
  },
  Query: {
    getAllBrands: () => {
      const brands = brandService.getAllBrands()
      return brands
    }
  }
};

