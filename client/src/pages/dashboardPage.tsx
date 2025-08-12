
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ClientForm } from "@/components/dashboard/clientForm"
import { UsersTable } from "@/components/dashboard/clientsTable";
import { InvoiceFormPage } from "@/components/dashboard/invoiceForm";

const users = [
  { id: "1", name: "Alice", email: "alice@example.com", phone: "555-1234", invoices: 4, invoiceStatus: "Paid" as const },
  { id: "2", name: "Bob", email: "bob@example.com", phone: "555-5678", invoices: 1, invoiceStatus: "Pending" as const },
  // ...
];
<UsersTable users={users} onSendEmail={onSendEmail} />

function onSendEmail(userId: string) {
  // Implement your email logic here
  alert(`Send email to user ID: ${userId}`);
}
export const  DashboardPage =() => {
  return (
      <DashboardLayout>
        <InvoiceFormPage/>    
    </DashboardLayout>
  );
}

