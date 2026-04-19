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

  type Query {
    _empty: String
  }

  type Mutation {
    createPerfume(params: CraetePerfumeInput): Pefume
  }
`;