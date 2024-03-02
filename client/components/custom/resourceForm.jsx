import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { revalidate } from "@/lib/actions";
import { uploadImages } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { z } from "zod"
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const contentSchema = z.object({
  type: z.string(),
  attachment: z.any(),
});

const resourceSchema = z.object({
  title: z.string(),
  content: z.array(contentSchema).refine((value) => value.length > 0, {
    message: 'Content array must not be empty',
  }),
});

export const ResourceForm = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      content: [{type: "", attachment: ""}],
    },
  });

  const { append, remove } = useFieldArray({
    control: form.control,
    name: "content"
  })

  const onSubmit = (values) => {
    console.log(values)
    // e.preventDefault();

    // uploadImages(contents).then((urls) => {
    //   fetch("http://localhost:4000/posts/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       title,
    //       contents: contents.map((c, i) => ({
    //         type: c.type,
    //         attachment: urls[i],
    //       })),
    //     }),
    //   })
    //     .then((res) => {
    //       if (res.ok) {
    //         console.log("Resource Created");
    //       }
    //       return res.json();
    //     })
    //     .then((json) => {
    //       console.log(json);
    //       revalidate("/resources").then(() => {
    //         router.push(`/resources/${json.post._id}`);
    //       });
    //     });
    //   console.log(urls);
    };

  console.log(form.getValues())

  return (
    <Form {...form}>

      <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2">
        <FormField
        className=""
        control={form.control}
        name={"title"}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>{"Title"}</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Resource Title here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.getValues().content.map(
          (obj, i) =>
            <>
            <FormField
            className=""
            control={form.control}
            name={`content[${i}].type`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{"Type"}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={{...field.value}}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a file type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            className=""
            control={form.control}
            name={`content[${i}].attachment`}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{"Attachment"}</FormLabel>
                  <FormControl>
                    {obj.type === "text" ?
                    <Input type="text" placeholder="Content Here" {...field} />:
                    <Input type="file" {...field} />}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            </>
        )}
        <Button variant="outline" onClick={() => {append({type: "", attachment: ""})}}>Add Content Section</Button>
        <Button type="submit" className="">Add Post</Button>
      </form>
    </Form>
  )
}
