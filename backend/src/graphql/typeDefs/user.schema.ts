//Type Definitions for User Schema

export const userTypeDef = `#graphql
  type User {
    id: ID!
    username: String!
    email: String!
    invoices: [Invoice!]!
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  
  type Mutation {
    registerUser(username: String!, email: String!, password: String!): User!
    loginUser(email: String!, password: String!): User
    updateUser(email: String!, username: String!): User!
    logoutUser: Boolean!
  }`
