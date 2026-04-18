const PerfumeTypeDefs = `#graphql
  
  type Variant {
    size 
    concentrate
    price
  }

  input CraetePerfumeInput {
    name 
    description
    brandId
    variants: [Variant]
  }

  type Pefume {
    id: ID!
    name: String
  }

  type Query {
    _empty: String
  }

  type Mutation {
    createPerfume(param: ): Perfume
  }
`;