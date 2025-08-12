// Type Definitions for Client

export const clientTypeDef = `#graphql 
    type Client {
        id: ID!
        name: String!
        email: String!
        phone: String!
        address: String!
        invoices: [Invoice!]!
    }

     type Query {
        myClients: [Client!]!
        client(id: ID): Client!
    }

     type Mutation {
        createClient(
        name: String!,
        email: String!,
        phone: String!,
        address: String!
        ): Client!

        updateClient (
        name: String!,
        email: String!,
        phone: String!,
        address: String
        ): Client

        deleteClient(id: ID!): Boolean!
    }
`;
