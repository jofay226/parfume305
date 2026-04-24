import { perfumeService } from "../../services/parfume.service.ts";

export const perfumeResolvers = {
  Query: {
    getPerfumes :  async (_, args) => {
      console.log(args);
      
      // const perfumes = await perfumeService.getPerfumes({})
      // console.log(perfumes);
      
      return "hello"
    },
  },
  Mutation: {
    createPerfume: async (_, {params}) => {
      const newPerfume = await perfumeService.createPerfume(params)
      return newPerfume
    },
  },
};





