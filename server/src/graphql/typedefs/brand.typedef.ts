export const typeDefs = `
  input CreateBrandInput {
    name: String!
  }

  type Brand {
    id: ID
    name: String 
  }

  extend type Mutation {
    createBrand(param: CreateBrandInput): Brand 
  }
`;