export const brandTypeDefs = `
  input CreateBrandInput {
    name: String!
  }

  type Brand {
    id: ID
    name: String 
  }
  
  input BrandInput {
    id: ID!
  }

  extend type Mutation {
    createBrand(param: CreateBrandInput): Brand 
    deleteBrand(param: BrandInput): Brand
  }

  extend type Query {
    getAllBrands: [Brand]
    getSingleBrand(param: BrandInput): Brand
  }
`;