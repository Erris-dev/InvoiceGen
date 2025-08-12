import { Invoice, InvoiceStatus } from "../entities/invoiceEntity";
import { User } from "../entities/userEntity";
import { Client } from "../entities/clientEntity";
import { AppDataSource } from "../db/data";
import { Repository } from "typeorm";
import { InvoiceItem } from "../entities/invoiceItem";
import { generateInvoicePdf } from "../lib/pdfGenerator"
import { sendInvoiceEmail } from "../lib/sendEmail";

interface CreateInvoiceArgs {
  invoiceNumber: string;
  dueDate: string;
  status: InvoiceStatus 
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  clientId: number;
}

export const createInvoice = async (args: CreateInvoiceArgs, userId: number): Promise<Invoice> => {
  try {
    const invoiceRepository: Repository<Invoice> = AppDataSource.getRepository(Invoice);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const clientRepository: Repository<Client> = AppDataSource.getRepository(Client);
    const itemRepository: Repository<InvoiceItem> = AppDataSource.getRepository(InvoiceItem);

    const { invoiceNumber, dueDate, status, items, clientId } = args;

    const user = await userRepository.findOneBy({ id: userId });
    const client = await clientRepository.findOneBy({ id: clientId });

    if (!user || !client) {
      throw new Error("User or client not found.");
    }


    const itemsWithTotal = items.map(item => ({
      ...item,
      lineTotal: item.quantity * item.unitPrice,
    }))

    const newInvoice = invoiceRepository.create({
      invoiceNumber,
      dueDate,
      status,
      user,
      client,
      items: itemsWithTotal
    });
    
    const savedInvoice = await invoiceRepository.save(newInvoice);

    const pdfPath = await generateInvoicePdf(savedInvoice);
    await sendInvoiceEmail(savedInvoice, pdfPath); // Call the email function here



    return savedInvoice;

  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create the invoice. Please try again.");
  }
};