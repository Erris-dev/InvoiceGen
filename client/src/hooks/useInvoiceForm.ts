// src/hooks/useCreateInvoice.ts
import { useMutation } from "@apollo/client";
import { CREATE_INVOICE } from "../graphql/mutations/invoiceMutation";
import type { InvoiceFormData } from "../lib/validations";

export const useCreateInvoice = () => {
  const [mutate, { loading, error }] = useMutation(CREATE_INVOICE);

 const createInvoice = async (data: InvoiceFormData) => {
  try {
    await mutate({
      variables: {
        invoiceNumber: data.invoiceNumber,
        dueDate: data.dueDate,
        status: data.status,
        items: data.items.map(i => ({
          description: i.description,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        clientId: data.clientId,
      },
    });
  } catch (err) {
    console.error("Failed to create invoice:", err);
    throw err; // rethrow if you want to handle it upstream
  }
};

  return { createInvoice, loading, error };
};
