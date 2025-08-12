// src/pages/InvoiceFormPage.tsx
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema, type InvoiceFormData } from "../../lib/validations";
import { useQuery } from "@apollo/client";
import { GET_MY_CLIENTS } from "../../graphql/querys/invoceQuery";
import { useCreateInvoice } from "../../hooks/useInvoiceForm";

export const InvoiceFormPage = () => {
  const { data: clientData, loading: clientsLoading } = useQuery(GET_MY_CLIENTS);
  const { createInvoice, loading: creating } = useCreateInvoice();

  const { register, handleSubmit, control, formState: { errors } } = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      invoiceNumber: "",
      dueDate: "",
      status: "pending",
      clientId: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: InvoiceFormData) => {
    console.log("Submitting variables:", data);
    await createInvoice(data);
    alert("Invoice created successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Invoice</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        
        <div>
          <label className="block font-medium">Invoice Number</label>
          <input {...register("invoiceNumber")} className="border rounded w-full p-2" />
          {errors.invoiceNumber && <p className="text-red-500">{errors.invoiceNumber.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Due Date</label>
          <input type="date" {...register("dueDate")} className="border rounded w-full p-2" />
          {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Status</label>
          <select {...register("status")} className="border rounded w-full p-2">
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
          </select>
          {errors.status && <p className="text-red-500">{errors.status.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Client</label>
          <select {...register("clientId")} className="border rounded w-full p-2" disabled={clientsLoading}>
            <option value="">Select a client</option>
            {clientData?.myClients?.map((client: any) => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          {errors.clientId && <p className="text-red-500">{errors.clientId.message}</p>}
        </div>

        <div>
          <label className="block font-medium mb-2">Items</label>
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-4 gap-2 mb-2">
              <input
                {...register(`items.${index}.description` as const)}
                placeholder="Description"
                className="border rounded p-2"
              />
              <input
                type="number"
                {...register(`items.${index}.quantity` as const, { valueAsNumber: true })}
                placeholder="Qty"
                className="border rounded p-2"
              />
              <input
                type="number"
                step="0.01"
                {...register(`items.${index}.unitPrice` as const, { valueAsNumber: true })}
                placeholder="Unit Price"
                className="border rounded p-2"
              />
              <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white px-2 rounded">
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ description: "", quantity: 1, unitPrice: 0 })} className="bg-blue-500 text-white px-4 py-1 rounded">
            Add Item
          </button>
          {errors.items && <p className="text-red-500">{errors.items.message as string}</p>}
        </div>

        <button
          type="submit"
          disabled={creating}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {creating ? "Creating..." : "Create Invoice"}
        </button>
      </form>
    </div>
  );
}
