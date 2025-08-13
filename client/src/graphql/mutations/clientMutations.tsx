import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation CreateClient($name: String!, $email: String!, $phone: String!, $address: String!) {
    createClient(name: $name, email: $email, phone: $phone, address: $address) {
      id
      name
      email
      phone
      address
    }
  }
`;

export const SEND_EMAIL = gql`
  mutation SendEmail($clientId: ID!) {
    sendRemainder(clientId: $clientId)
  }
`;