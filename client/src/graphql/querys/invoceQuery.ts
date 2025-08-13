import { gql } from "@apollo/client";

export const GET_MY_CLIENTS = gql`
  query MyClients {
    myClients {
      id
      name
      email
      phone
      invoices {
        id
        status
      }
    }
  }
`;
