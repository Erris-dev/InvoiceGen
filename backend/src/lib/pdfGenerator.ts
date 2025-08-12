// src/utils/pdfGenerator.ts
import puppeteer from 'puppeteer';
import { Invoice } from '../entities/invoiceEntity';
import * as fs from 'fs/promises';
import * as path from 'path';

export const generateInvoicePdf = async (invoice: Invoice): Promise<string> => {
    // Convert to numbers once to avoid multiple conversions and potential errors
    const convertedInvoice = {
        ...invoice,
        totalAmount: Number(invoice.totalAmount),
        items: invoice.items.map(item => ({
            ...item,
            unitPrice: Number(item.unitPrice),
            lineTotal: Number(item.lineTotal)
        }))
    };

    // Define the directory path and file path
    const invoicesDir = path.join(__dirname, '..', '..', 'invoices');
    const pdfPath = path.join(invoicesDir, `invoice-${convertedInvoice.invoiceNumber}.pdf`);

    // Check if the directory exists, and create it if it doesn't.
    try {
        await fs.access(invoicesDir);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.log(`Directory '${invoicesDir}' does not exist. Creating it...`);
            await fs.mkdir(invoicesDir, { recursive: true });
        } else {
            throw error;
        }
    }

    // Generate the HTML content for the invoice using template literals
    const invoiceHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Invoice #${convertedInvoice.invoiceNumber}</title>
            <style>
                body {
                    font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
                    text-align: center;
                    color: #555;
                }
                .invoice-box {
                    max-width: 800px;
                    margin: auto;
                    padding: 30px;
                    border: 1px solid #eee;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
                    font-size: 16px;
                    line-height: 24px;
                    color: #555;
                }
                .invoice-box table {
                    width: 100%;
                    line-height: inherit;
                    text-align: left;
                    border-collapse: collapse;
                }
                .invoice-box table td {
                    padding: 10px;
                    vertical-align: top;
                }
                .invoice-box table tr td:nth-child(2) {
                    text-align: right;
                }
                .invoice-box table tr.top table td {
                    padding-bottom: 20px;
                }
                .invoice-box table tr.top table td.title {
                    font-size: 45px;
                    line-height: 45px;
                    color: #333;
                }
                .invoice-box table tr.information table td {
                    padding-bottom: 40px;
                }
                .invoice-box table tr.heading td {
                    background: #f0f0f0;
                    border-bottom: 1px solid #ddd;
                    font-weight: bold;
                }
                .invoice-box table tr.item td {
                    border-bottom: 1px solid #eee;
                }
                .invoice-box table tr.item.last td {
                    border-bottom: none;
                }
                .invoice-box table tr.total td:nth-child(2) {
                    border-top: 2px solid #eee;
                    font-weight: bold;
                    color: #333;
                    text-align: right;
                }
            </style>
        </head>
        <body>
            <div class="invoice-box">
                <table cellpadding="0" cellspacing="0">
                    <tr class="top">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td class="title">
                                        InvoiceGen
                                    </td>
                                    <td>
                                        Invoice #: ${convertedInvoice.invoiceNumber}<br>
                                        Created: ${new Date(convertedInvoice.issueDate).toLocaleDateString()}<br>
                                        Due: ${new Date(convertedInvoice.dueDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr class="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        From: <br>
                                        <strong>Your Company Name</strong><br>
                                        123 Company Street<br>
                                        City, State ZIP<br>
                                        hello@yourcompany.com
                                    </td>
                                    <td>
                                        To: <br>
                                        <strong>${convertedInvoice.client.name}</strong><br>
                                        ${convertedInvoice.client.email}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <tr class="heading">
                        <td>Payment Method</td>
                        <td>Check #</td>
                    </tr>
                    
                    <tr class="details">
                        <td>Check</td>
                        <td>1000</td>
                    </tr>
                    
                    <tr class="heading">
                        <td>Item</td>
                        <td>Price</td>
                    </tr>
                    
                    ${convertedInvoice.items.map(item => `
                        <tr class="item">
                            <td>${item.description}</td>
                            <td>$${item.lineTotal.toFixed(2)}</td>
                        </tr>
                    `).join('')}

                    <tr class="total">
                        <td></td>
                        <td>Total: $${convertedInvoice.totalAmount.toFixed(2)}</td>
                    </tr>
                </table>
            </div>
        </body>
        </html>
    `;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(invoiceHtml);
    
    // Use the previously defined PDF path
    await page.pdf({ path: pdfPath, format: 'A4' });

    await browser.close();
    
    console.log(`PDF generated at ${pdfPath}`);
    return pdfPath;
};