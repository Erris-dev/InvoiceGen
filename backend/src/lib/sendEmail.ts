// src/utils/emailSender.ts
import nodemailer from 'nodemailer';
import { Invoice } from '../entities/invoiceEntity';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or use an SMTP host from another provider (e.g., SendGrid)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendInvoiceEmail = async (invoice: Invoice, pdfPath: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: invoice.client.email, // Use the client's email address
        subject: `Invoice #${invoice.invoiceNumber}`,
        html: `
            <h1>Hello, ${invoice.client.name},</h1>
            <p>Your invoice #${invoice.invoiceNumber} is attached. The due date is ${new Date(invoice.dueDate).toLocaleDateString()}.</p>
            <p>Thank you for your business!</p>
        `,
        attachments: [
            {
                filename: `invoice-${invoice.invoiceNumber}.pdf`,
                path: pdfPath, // Path to the generated PDF file
                contentType: 'application/pdf',
            },
        ],
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${invoice.client.email} with invoice #${invoice.invoiceNumber}`);
    } catch (error) {
        console.error("Failed to send email:", error);
        throw new Error("Failed to send the invoice email.");
    }
};