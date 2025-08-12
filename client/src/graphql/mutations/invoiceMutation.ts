import { gql } from "@apollo/client";

export const CREATE_INVOICE = gql`
  mutation CreateInvoice(
    $invoiceNumber: String!,
    $dueDate: String!,
    $status: String!,
    $items: [InvoiceItemInput!]!,
    $clientId: ID!
  ) {
    createInvoice(
      invoiceNumber: $invoiceNumber,
      dueDate: $dueDate,
      status: $status,
      items: $items,
      clientId: $clientId
    ) {
      id
      invoiceNumber
    }
  }
`;