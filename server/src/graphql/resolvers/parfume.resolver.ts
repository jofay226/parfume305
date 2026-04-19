import { perfumeService } from "../../services/parfume.service.ts";

export const perfumeResolvers = {
  Query: {
    _empty: () => 'Hello World',
  },
  Mutation: {
    createPerfume: async (_, {params}) => {
      const newPerfume = await perfumeService.createPerfume(params)
      return newPerfume
    },
  },
};





