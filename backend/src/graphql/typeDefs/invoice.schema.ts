export const invoiceTypeDef = `#graphql
  type Invoice {
    id: ID!
    invoiceNumber: String!
    issueDate: String!
    dueDate: String!
    totalAmount: Float!
    status: String!
    user: User!
    client: Client!
    items: [InvoiceItem!]!
    payments: [Payment!]!
  }

  type InvoiceItem {
    id: ID!
    description: String!
    quantity: Int!
    unitPrice: Float!
    lineTotal: Float
  }

  input InvoiceItemInput {
    description: String!
    quantity: Int!
    unitPrice: Float!
  }



  input UpdateInvoiceItemInput {
    id: ID!
    description: String!
    quantity: Int!
    unitPrice: Float!
  }

  input UpdateInvoiceInput {
    id: ID!
    invoiceNumber: String!
    dueDate: String!
    items: [UpdateInvoiceItemInput!]!
  }

   type Query {
    invoices: [Invoice!]!
    invoice(id: ID!): Invoice!
  }

   type Mutation {
    createInvoice(
      invoiceNumber: String!
    dueDate: String!
    status: String!
    items: [InvoiceItemInput!]!
    clientId: ID!,
    ): Invoice!
    updateInvoice(
    input: UpdateInvoiceInput!
    ): Invoice!
    deleteInvoice(id: ID!): Boolean!
  }
`;
