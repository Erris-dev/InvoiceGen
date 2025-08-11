// src/hooks/useLogin.ts

import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "@/graphql/mutations/authMutations";
import { loginSchema, type LoginFormValues } from "@/lib/validations";

export const useLogin = (
  onSuccess: (data: any) => void
) => {
  // Sets up the form with the Zod schema for validation and default values
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Initializes the GraphQL mutation
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

  // Defines the function that runs when the form is submitted and passes validation
  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      // Executes the mutation with the form's email and password
        const { email, password } = values;

       const { data } = await loginUser({
        variables: {
          email,
          password,
        },
      });

      console.log("Login successful:", data);
      onSuccess(data); // Calls the success callback provided by the component

    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  // Returns the form object, the submission handler, and the mutation states
  return { form, onSubmit, loading, error };
};