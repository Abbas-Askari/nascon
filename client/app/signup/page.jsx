"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AuthForm } from "@/components/custom/authForm";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupAsync } from "@/lib/auth/authSlice";

const signupSchema = z
  .object({
    name: z.string().min(8, "Name must be at least 8 characters long."),
    email: z.string().email("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    // password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //     {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',}
    //   ),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ password, passwordConfirm }) => {
      return password === passwordConfirm;
    },
    {
      message: "Passwords do not Match",
      path: ["passwordConfirm"],
    }
  );

const Signup = () => {

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(state => state.auth)

  const router = useRouter()
  useEffect(() => {
    if (user) router.push("/")
  }, [user])

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData)
    dispatch(signupAsync(formData))
  };

  const fields = [
    {
      name: "name",
      label: "Username",
      type: "text",
      placeholder: "Type your username here" 
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "Type your email here" 
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter a Password" 
    },
    {
      name: "passwordConfirm",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password" 
    },
  ]

  return (
    <AuthForm
    fields={fields}
    form={form}
    onSubmit={onSubmit}
    header={"Create A New Account"}
    buttonText={"Sign Up"}
    footerText={"Already Have an Account?"} 
    linkText={"Sign In."}
    linkPath={"/login"}
    />
  );
};

export default Signup;
