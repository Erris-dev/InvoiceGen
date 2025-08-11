// src/hooks/useRegister.ts
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_USER } from "@/graphql/mutations/authMutations";
import { registerSchema, type RegisterFormValues } from "@/lib/validations";

export const useRegister = (
  onSuccess: () => void
) => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [createUser, { data, loading, error }] = useMutation(CREATE_NEW_USER);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (values) => {
    try {
      const { username, email, password } = values;
      
      await createUser({
        variables: {
            username,
            email,
            password,
        },
      });

      console.log("User created successfully");
      onSuccess();

    } catch (err) {
      console.error("Mutation failed:", err);
    }
  };

  return { form, onSubmit, loading, error };
};