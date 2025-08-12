import React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  invoices: number;
  invoiceStatus: "Paid" | "Pending" | "Overdue";
}

interface UsersTableProps {
  users: User[];
  onSendEmail: (userId: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, onSendEmail }) => {
  return (
    <Table>
      <TableCaption>List of all users and their invoice status.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Invoices</TableHead>
          <TableHead>Invoice Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
              No users found.
            </TableCell>
          </TableRow>
        ) : (
          users.map(({ id, name, email, phone, invoices, invoiceStatus }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{invoices}</TableCell>
              <TableCell>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold
                    ${
                      invoiceStatus === "Paid"
                        ? "bg-green-100 text-green-800"
                        : invoiceStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  `}
                >
                  {invoiceStatus}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <Button size="sm" variant="outline" onClick={() => onSendEmail(id)} aria-label={`Send email to ${name}`}>
                  Send Email
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
