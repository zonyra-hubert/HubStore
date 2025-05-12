"use client";

import { VariantsWithImagesTags } from "@/lib/infer-types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { VariantSchema } from "@/types/variant-schema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import InputTags from "./input-tags";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hook";
import { createVariant } from "@/server/actions/create-variant";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { deleteVariant } from "@/server/actions/delete-variant";

const ProductVariant = ({
  editMode,
  productID,
  variant,
  children,
}: {
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
  children: React.ReactNode;
}) => {
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#000000",
      editMode,
      id: undefined,
      productID,
      productType: "Black Notebook",
    },
  });

  const [open, setOpen] = useState(false);

  const setEdit = () => {
    if (!editMode) {
      form.reset();
      return;
    }
    if (editMode && variant) {
      form.setValue("editMode", true);
      form.setValue("id", variant.id);
      form.setValue("productID", variant.productID);
      form.setValue("productType", variant.productType);
      form.setValue("color", variant.color);
      form.setValue(
        "tags",
        variant.variantTags.map((tag) => tag.tag)
      );
      form.setValue(
        "variantImages",
        variant.variantImages.map((img) => ({
          name: img.name,
          size: img.size,
          url: img.url,
        }))
      );
    }
  };

  useEffect(() => {
    setEdit();
  }, [variant]);
  const { execute, status } = useAction(createVariant, {
    onExecute() {
      if (!editMode) {
        const toastId = toast.loading("Creating variant...");

        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
      }
      if (editMode) {
        const toastId = toast.loading("Editing variant...");

        setTimeout(() => {
          toast.dismiss(toastId);
        }, 3000);
      }
      setOpen(false);
    },
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });

  const variantAction = useAction(deleteVariant, {
    onExecute() {
      const toastId = toast.loading("Deleting variant...");

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 3000);

      setOpen(false);
    },
    onSuccess(data) {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });

  function onSubmit(values: z.infer<typeof VariantSchema>) {
    execute(values);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="lg:max-w-screen-lg  overflow-y-scroll overflow-scroll max-h-[640px]">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Edit " : "Create"} your variant
          </DialogTitle>
          <DialogDescription>
            Manage your product variants here. You can add tags, images, and
            more.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Variant Title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant Color</FormLabel>
                  <FormControl>
                    <Input type="color" placeholder="Color" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <InputTags {...field} onChange={(e) => field.onChange(e)} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />
            <div className="flex gap-4 items-center justify-center">
              {editMode && variant && (
                <Button
                  variant={"destructive"}
                  type="button"
                  disabled={variantAction.status === "executing"}
                  onClick={(e) => {
                    e.preventDefault();
                    variantAction.execute({ id: variant.id });
                  }}
                >
                  Delete Variant
                </Button>
              )}
              <Button
                disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
                type="submit"
              >
                {editMode ? "Update Variant" : "Create Variant"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariant;
