import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_MY_CLIENTS } from "@/graphql/querys/invoceQuery";
import { SEND_EMAIL } from "@/graphql/mutations/clientMutations";


export const useGetClients = () => {
  const { data, loading, error, refetch } = useQuery(GET_MY_CLIENTS);

  const clients =
    data?.myClients.map((client: any) => ({
      id: client.id,
      name: client.name,
      email: client.email,
      phone: client.phone,
      invoices: client.invoices.length,
      invoiceStatus:
        client.invoices.length > 0
          ? client.invoices[0].status
          : "Pending",
    })) || [];

  return { clients, loading, error, refetch };
};

export const useSendEmail = () => {
  const [sendEmailMutation, { loading, error, data }] = useMutation(SEND_EMAIL);

  const sendEmail = async (clientId: string) => {
    return await sendEmailMutation({ variables: { clientId } });
  };

  return { sendEmail, loading, error, data };
};