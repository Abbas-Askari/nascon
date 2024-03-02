"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/custom/passwordInput";
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppSelector } from "@/lib/hooks"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Pencil1Icon, Pencil2Icon } from "@radix-ui/react-icons";

const profileSchema = z
  .object({
    name: z.string().min(8, "Name must be at least 8 characters long."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    // password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
    //   .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //     {message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',}
    //   ),
  })

const Profile = () => {
  const { user } = useAppSelector(state => state.auth)
  const [editing, setEditing] = useState(false)

  console.log(user)

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name,
      password: user?.password,
    },
  });

  const onSubmit = async (formData) => {
    console.log(formData)
    // dispatch(signupAsync(formData))
  };

  const authfields = [
    {
      name: "name",
      label: "Username",
      type: "text",
      placeholder: "Your public display name" 
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter a Secure Password" 
    },
  ]

  const authFields = authfields.map(fieldObject => 
    <FormField
    className=""
    control={form.control}
    key={fieldObject.name}
    name={fieldObject.name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{fieldObject.label}</FormLabel>
          <FormControl>
            {fieldObject.type === "password" ? 
            <PasswordInput disabled={!editing} placeholder={fieldObject.placeholder} field={field} /> :
            <Input disabled={!editing} type={fieldObject.type} placeholder={fieldObject.placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />)

  const additionalfields = [
    {
      name: "example",
      label: "Example",
      type: "text",
      placeholder: "This is a placeholder" 
    },
    {
      name: "example",
      label: "Example",
      type: "text",
      placeholder: "This is a placeholder" 
    },
    {
      name: "example",
      label: "Example",
      type: "text",
      placeholder: "This is a placeholder" 
    },
    {
      name: "example",
      label: "Example",
      type: "text",
      placeholder: "This is a placeholder" 
    },
  ]

  const additionalFields = additionalfields.map(fieldObject => 
    <FormField
    className=""
    control={form.control}
    key={fieldObject.name}
    name={fieldObject.name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>{fieldObject.label}</FormLabel>
          <FormControl>
            {fieldObject.type === "password" ? 
            <PasswordInput disabled={!editing} placeholder={fieldObject.placeholder} field={field} /> :
            <Input disabled={!editing} type={fieldObject.type} placeholder={fieldObject.placeholder} {...field} />}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />)

  return (
    <Card className="flex h-4/5 w-4/5">
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="w-full flex flex-col items-center p-4 gap-2">
          <div className="relative w-4/5 aspect-square">
            <Avatar className="w-full h-full">
              <AvatarImage src="#" alt="profile picture"/>
              <AvatarFallback className="text-4xl">TS</AvatarFallback>
            </Avatar>
            {editing &&
            <Button variant="ghost" className="absolute top-0 right-0" size="icon">
              <Pencil1Icon className="w-20 aspect-square"/>
            </Button>}
          </div>
          <div className="p-4 flex flex-col gap-1">
            <p className="font-semibold text-2xl">{user?.name}</p>
            <p className="leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </div>  
      </div>
      <Separator orientation="vertical"/>
      <div className="flex-[3_0_0] flex flex-col p-8">
        <div className="flex w-full justify-between">
          <h1 className="text-3xl font-semibold">Profile</h1>
          {!editing && <Button variant="outline" onClick={() => setEditing(!editing)}>Edit Profile</Button>}
        </div>
        <Separator className="my-2"/>
        <div className="w-full h-full bg-neutral-950">
          <Form {...form}>
            <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 h-full ">
              <div className="flex gap-8 py-2">
                {authFields}
              </div>
              <Separator />
              <h1 className="text-2xl font-semibold">Additional Info</h1>
              {additionalFields}
              <div className="self-end flex gap-2">
                {editing && <Button onClick={() => setEditing(!editing)} variant="outline">Cancel</Button>}
                <Button disabled={!editing} type="submit" className="">Save Profile</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Card>
  )
}

export default Profile