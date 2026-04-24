import { perfumeService } from "../../services/parfume.service.ts";

export const perfumeResolvers = {
  Query: {
    getPerfumes :  async (_, {input}) => {
      const perfumes = await perfumeService.getPerfumes(input)  
      console.log(perfumes);
          
      return perfumes
    },
  },
  Mutation: {
    createPerfume: async (_, {params}) => {
      const newPerfume = await perfumeService.createPerfume(params)
      return newPerfume
    },
  },
};





