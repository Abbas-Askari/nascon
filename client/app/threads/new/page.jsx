"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function NewThreadPage() {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const threadSchema = z.object({
    title: z.string("Title is required"),
    content: z.string().min(6, "Content must be at least 3 characters long."),
  });
  // const router = useRouter();

  // useEffect(() => {
  //   console.log(user);
  //   // if (user) router.push("/");
  // }, [user]);

  const form = useForm({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit = async (formData) => {
    fetch("http://localhost:4000/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    console.log(formData, token);

    // dispatch(loginAsync(formData));
  };

  return (
    <Form {...form}>
      <form
        autoComplete="off"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-2 h-full"
      >
        <FormField
          className=""
          control={form.control}
          name={"title"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{"Title"}</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Thread title here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          className=""
          control={form.control}
          name={"content"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{"Title"}</FormLabel>
              <FormControl>
                <Textarea
                  type="text"
                  placeholder="Thread content here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="">
          Add Product
        </Button>
      </form>
    </Form>
  );
}

export default NewThreadPage;
