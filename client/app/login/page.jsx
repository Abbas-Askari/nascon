"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthForm } from "@/components/custom/authForm";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginAsync, setErrors } from "@/lib/auth/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useAppDispatch();
  const { user, errors } = useAppSelector((state) => state.auth);
  const loginSchema = z
    .object({
      email: z.string().email("Email is required"),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long."),
      // password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
      //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      //     {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',}
      //   ),
    })
    .refine(
      (data) => {
        return errors.length === 0;
      },
      {
        message: errors[0]?.message,
        path: [errors[0]?.path],
      }
    );
  console.log({ errors });
  const router = useRouter();

  useEffect(() => {
    console.log(user);
    if (user) router.push("/");
  }, [user]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    dispatch(loginAsync(formData));
    dispatch(setErrors("hello"));
  };

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "abc123@example.com",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password@123",
    },
  ];

  return (
    <AuthForm
      fields={fields}
      form={form}
      onSubmit={onSubmit}
      header={"Login"}
      buttonText={"Login"}
      footerText={"Don't Have an Account?"}
      linkText={"Sign Up."}
      linkPath={"/signup"}
    />
  );
};

export default Login;
