// hooks/useClientForm.ts

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { CREATE_CLIENT } from "@/graphql/mutations/clientMutations";

const clientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(7, "Phone must be at least 7 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

export type ClientFormValues = z.infer<typeof clientSchema>;

export const useClientForm = () => {
  const [form, setForm] = useState<ClientFormValues>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormValues, string>>>({});
  const [createClient, { data, loading }] = useMutation(CREATE_CLIENT);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" })); // Clear error on change
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = clientSchema.safeParse(form);
    if (!validation.success) {
      const fieldErrors: Partial<Record<keyof ClientFormValues, string>> = {};
      validation.error.issues.forEach((err) => {
        const field = err.path[0] as keyof ClientFormValues;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

   const data =  await createClient({ variables: form });
    setForm({ name: "", email: "", phone: "", address: "" });
    console.log("Client created successfully", data)
  };
  return { form, errors, loading, handleChange, handleSubmit };
};
