"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

/**
 * Updated FormSchema for additional fields
 */
const FormSchema = z.object({
  rawdata: z
    .string()
    .min(2, { message: "Rawdata must be at least 2 characters." }),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters." }),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters." }),
  date: z.coerce.date({ message: "Please select a valid date." }), // Converts string input into Date
});

/**
 * Updated props to include new fields
 */
export interface IFormQrCodeProps {
  formData: {
    rawdata: string;
  };
}

export default function FormQrCode({ formData }: IFormQrCodeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      rawdata: formData.rawdata,
      name: "Grinder",
      description: "rs 20000 taken from SP road",
      location: "Bengaluru",
    },
  });

  const {
    control,
    handleSubmit,
    reset, // Used to update form values
    formState: { errors },
  } = form;

  // 🔄 Update form when formData changes
  useEffect(() => {
    reset({
      rawdata: formData.rawdata,
    });
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
      <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {/* Rawdata (Read-Only) */}
        <FormField
          control={control}
          name="rawdata"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Raw Data</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Raw data"
                  value={field.value}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </FormControl>
              <FormDescription>Data extracted from QR code.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name */}
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker */}
        <FormField
          control={control}
          name="date"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Form Update date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the date that is to be updated
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
