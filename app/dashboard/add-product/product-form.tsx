"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/types/product-schema";
import { useForm } from "react-hook-form";
import { zProductSchema } from "@/types/product-schema";

import Tiptap from "./tiptap";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hook";
import { createProduct } from "@/server/actions/create-product";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getProduct } from "@/server/actions/get-product";
import { useEffect } from "react";
import { CediIcon } from "@/components/navigation/cidi-icon";

export default function ProductForm() {
  const form = useForm<zProductSchema>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams?.get("id");

  const checkProduct = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id);
      if (data.error) {
        toast.error(data.error);
        router.push("/dashboard/products");
        return;
      }
      if (data.success) {
        const id = parseInt(editMode);
        form.setValue("title", data.success.title);
        form.setValue("price", data.success.price);
        form.setValue("description", data.success.description);
        form.setValue("id", id);
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkProduct(parseInt(editMode));
    }
  }, [editMode]);

  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.success);
        router.push("/dashboard/products");
      }
      if (data?.error) {
        toast.error(data.error);
        router.push("/dashboard/products");
      }
    },
    onExecute: () => {
      if (editMode) {
        const toastId = toast.loading("Updating listing");

        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
      }
      if (!editMode) {
        const toastId = toast.loading("Creating listing");

        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
      }
    },
  });

  async function onSubmit(values: zProductSchema) {
    execute(values);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{editMode ? "Edit Listing" : "Create listing"}</CardTitle>
        <CardDescription>
          {" "}
          {editMode
            ? "Make changes to an existing listing"
            : "Create a new rental listing"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Sunrise Hostel - 2 Bed Room"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Starting From</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <CediIcon />
                      <Input
                        {...field}
                        type="number"
                        placeholder="Starting from amount"
                        step={0.01}
                        min={0}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              {editMode ? "Save Changes" : "Create listing"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
