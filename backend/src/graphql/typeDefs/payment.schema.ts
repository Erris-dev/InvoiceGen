// Type Definition For Payment Schema

 const paymentTypeDef = `#graphql 
    type Payment {
        id: ID!
        amount: Float!
        paymentDate: String!
        paymentMethod: String!
    }

     type Query {
        getPayments: [Payment!]!
        getPaymentById(id: ID!): Payment
    }

     type Mutation {
        createPayment(amount: Float! paymentMethod: String!): Payment!
        updatePayment(id: ID! amount: Float paymentMethod: String): Payment!
        deletePayment(id: ID!): Payment!
    }
`
export default paymentTypeDef