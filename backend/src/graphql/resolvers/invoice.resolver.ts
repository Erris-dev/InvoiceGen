import { Invoice } from "../../entities/invoiceEntity";
import { createInvoice } from "../../controllers/invoiceController";

interface ContextResolver {
  res: any;
}
export type InvoiceStatus = "pending" | "paid" | "overdue" | "DRAFT";

interface CreateInvoiceArgs {
  invoiceNumber: string;
  dueDate: string;
  status: InvoiceStatus;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[]; // This correctly represents the array of objects
  clientId: number;
}

export const invoiceResolver = {
  Mutation: {
    createInvoice: async (
      _: any,
      args: CreateInvoiceArgs,
      context: { decodedToken?: { userId: number } }
    ) => {
      const userId = context.decodedToken?.userId;
      if (!userId) throw new Error("Not authenticated");
      createInvoice(args, userId);
    },
  },
};
