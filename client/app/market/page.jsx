"use client"

import { ProductCard } from "@/components/custom/productCard"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { z } from "zod";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"


const productSchema = z.object({
    name: z.string().min(8, "Name must be at least 8 characters long."),
    price: z.number().min(1, "Price Cannot be zero"),
    description: z.string().min(10, "Add a Lengthier Description"),
  })


const Market = () => {

  const onSubmit = async (formData) => {
    console.log(formData)
  };

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
    },
  });

  return (
    <div className="flex flex-col h-full w-full p-20 gap-4">
      <div className="flex justify-between">
        <h1 className="text-4xl font-semibold">MarketPlace</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Upload a new Product for other users to buy.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-2 h-full">
              <FormField
                className=""
                control={form.control}
                name={"name"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Title"}</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Product Title here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                className=""
                control={form.control}
                name={"price"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Price"}</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Product Price here" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                className=""
                control={form.control}
                name={"description"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Description"}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Product Description"
                          className="resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="">Add Product</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className="h-full w-full gap-4 flex flex-wrap justify-center">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  )
}

export default Market