"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/custom/passwordInput";
import Link from "next/link";

export const AuthForm = ({header, form, onSubmit, buttonText, footerText, linkPath, linkText, fields}) => {
  const formFields = fields.map(fieldObject => 
    <FormField
    control={form.control}
    key={fieldObject.name}
    name={fieldObject.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldObject.label}</FormLabel>
          <FormControl>
            {fieldObject.type === "password" ? 
            <PasswordInput placeholder={fieldObject.placeholder} field={field} /> :
            <Input type={fieldObject.type} placeholder={fieldObject.placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />)

  return (
    <Card className="w-4/5 max-w-md">
      <CardHeader>
        <CardTitle className="text-3xl text-center">{header}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {formFields}
            <Button className="w-full" type="submit">{buttonText}</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p>{footerText} <Link className="text-blue-500 underline" href={linkPath}>{linkText}</Link></p>
      </CardFooter>
    </Card>
  )
}
