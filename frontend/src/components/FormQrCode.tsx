/**
 * This is the form with respect to the qr code scanner to input data in to the system
 */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

/**
 * FormSchema that is made with ZOD so that verification happens alongside
 */
const FormSchema = z.object({
  rawdata: z.string().min(2, {
    message: "rawdata must be at least 2 characters.",
  }),
});

/**
 * Interface for the form similar to the schema explained above
 */
export interface IFormQrCodeProps {
  formData: { rawdata: string };
}

export default function FormQrCode({ formData }: IFormQrCodeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rawdata: formData.rawdata, // Set initial value
    },
  });

  // Update form when formData changes
  const { reset } = form;
  useEffect(() => {
    reset({ rawdata: formData.rawdata });
  }, [formData, reset]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="rawdata"
          render={({ field }) => (
            <FormItem>
              <FormLabel>rawdata</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="raw data"
                  value={field.value}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </FormControl>
              <FormDescription>
                This is the information on the QR code
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
