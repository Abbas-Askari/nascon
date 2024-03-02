"use client";

import { ProductCard } from "@/components/custom/productCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { useDebugValue, useEffect, useState } from "react";
import { uploadImages } from "@/lib/utils";

const productSchema = z.object({
  name: z.string().min(8, "Name must be at least 8 characters long."),
  price: z.string().min(1, "Price Cannot be zero"),
  description: z.string().min(10, "Add a Lengthier Description"),
});

const Market = () => {
  const [image, setImage] = useState(null);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      });
  });

  const onSubmit = async (formData) => {
    console.log(formData);
    const form = new FormData();
    form.append("images", image);
    const res = await fetch("http://localhost:4000/images", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
      },
      body: form,
    });
    const { urls } = await res.json();

    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: {
          name: formData.name,
          price: formData.price,
          description: formData.description,
          imageURL: urls[0],
        },
      }),
    })
      .then((res) => {
        console.log(res);
      })
      .then((json) => {
        console.log(json);
      });
  };

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: null,
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
              <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-2 h-full"
              >
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {/* <img src= alt="" /> */}
                  <Label htmlFor="picture">Picture</Label>
                  <Input
                    name="image"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                    }}
                    id="picture"
                    type="file"
                  />
                </div>
                <FormField
                  className=""
                  control={form.control}
                  name={"name"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Title"}</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Product Title here"
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
                  name={"price"}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{"Price"}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Product Price here"
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
                <Button type="submit" className="">
                  Add Product
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <div className="h-full w-full gap-4 flex flex-wrap justify-center">
        {products.map((product) => {
          return <ProductCard product={product} />;
        })}
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Market;
