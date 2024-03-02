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
  // const [title, setTitle] = useState("");
  // const [contents, setContents] = useState([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      content: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "content"
  })

  const onSubmit = (e) => {
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
          
        <Button variant="outline">Add Content Section</Button>
        <Button type="submit" className="">Add Post</Button>
      </form>
    </Form>
  )
}
