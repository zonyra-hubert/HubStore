"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VariantSchema } from "@/types/variant-schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import * as z from "zod";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { UploadDropzone } from "@/app/api/uploadthing/upload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Reorder } from "framer-motion";
import { useState } from "react";
const VariantImages = () => {
  const { getValues, control, setError } =
    useFormContext<z.infer<typeof VariantSchema>>();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: "variantImages",
  });

  const [active, setActive] = useState(0);
  return (
    <div>
      <FormField
        control={control}
        name="variantImages"
        render={({}) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <UploadDropzone
                className="ut-allowed-content:text-secondary-foreground ut-label:text-primary ut-upload-icon:text-primary/50 hover:bg-primary/10 transition-all duration-500 ease-in-out border-secondary ut-button:bg-primary/75 ut-button:ut-readying:bg-secondary"
                onUploadError={(error) => {
                  setError("variantImages", {
                    type: "validate",
                    message: error.message,
                  });
                  return;
                }}
                onBeforeUploadBegin={(files) => {
                  files.map((file) =>
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    })
                  );
                  return files;
                }}
                onClientUploadComplete={(files) => {
                  const images = getValues("variantImages");
                  images.map((field, imgIDX) => {
                    if (field.url.search("blob:") === 0) {
                      const image = files.find(
                        (img) => img.name === field.name
                      );
                      if (image) {
                        update(imgIDX, {
                          url: image.ufsUrl,
                          name: image.name,
                          size: image.size,
                          key: image.key,
                        });
                      }
                    }
                  });
                  return;
                }}
                config={{ mode: "auto" }}
                endpoint="variantUploader"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Images</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody> */}
          <Reorder.Group
            as="tbody"
            values={fields}
            onReorder={(e) => {
              const activeElement = fields[active];
              e.map((item, index) => {
                if (item === activeElement) {
                  move(active, index);
                  setActive(index);
                  return;
                }
                return;
              });
            }}
          >
            {fields.map((field, index) => {
              return (
                <Reorder.Item
                  as="tr"
                  key={field.id}
                  id={field.id}
                  value={field}
                  onDragStart={() => setActive(index)}
                  className={cn(
                    field.url.search("blob:") === 0
                      ? "animate-pulse transition-all"
                      : "",
                    "text-sm font-bold text-muted-foreground"
                  )}
                >
                  <TableCell>{index}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>
                    {(field.size / (1024 * 1024)).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        alt={field.name}
                        src={field.url}
                        className="rounded-md"
                        width={72}
                        height={48}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                      }}
                      variant={"ghost"}
                      className="scale-75"
                    >
                      <Trash className="h-5" />
                    </Button>
                  </TableCell>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
          {/* </TableBody> */}
        </Table>
      </div>
    </div>
  );
};

export default VariantImages;
