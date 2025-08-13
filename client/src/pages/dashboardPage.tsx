
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ClientForm } from "@/components/dashboard/clientForm"
import { UsersTable } from "@/components/dashboard/clientsTable";
import { InvoiceFormPage } from "@/components/dashboard/invoiceForm";
import { useSendEmail } from "@/hooks/useGetClients";
import { useGetClients } from "@/hooks/useGetClients";





function onSendEmail(userId: string) {
  // Implement your email logic here
  alert(`Send email to user ID: ${userId}`);
}
export const  DashboardPage =() => {
    const { clients, loading, error } = useGetClients();
    const { sendEmail } = useSendEmail();

     const handleSendEmail = async (clientId: string) => {
    try {
      await sendEmail(clientId);
      alert("Email sent successfully!");
    } catch {
      alert("Failed to send email");
    }
  };


  return (
      <DashboardLayout>
        <UsersTable users={clients} onSendEmail={handleSendEmail} />
    </DashboardLayout>
  );
}

