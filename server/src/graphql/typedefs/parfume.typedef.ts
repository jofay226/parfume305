export const perfumeTypeDefs = `#graphql
  
  input Variant {
    size: Int
    concentrate: String
    price: Int
  }

  input CraetePerfumeInput {
    name: String
    description: String
    brandId: String
    variants: [Variant]
  }

  type Pefume {
    id: ID!
    name: String
    description: String
  }

  input FilterType {
    brandId: String
    size: Int 
    concentrate: String
  }

  type VariantGet {
    size: Int
    concentrate: String
    price: Int
  }

  type PefumeGet {
    name: String
    description: String
    brandId: ID 
    variants: [VariantGet]
  }

  type Query {
    getPerfumes(input: FilterType): [PefumeGet]
  }

  type Mutation {
    createPerfume(params: CraetePerfumeInput): Pefume
  }
`;