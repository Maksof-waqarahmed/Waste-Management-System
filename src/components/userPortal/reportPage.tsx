"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Card } from "../ui/card";
import { useState } from "react";
import { VerifyingImage } from "./verifyingImage";

const formSchema = z.object({
  location: z.string({ required_error: "Location is required" }),
  wasteType: z.string().optional(), // Optional if value is provided in state
  estimatedAmount: z.string().optional(), // Optional if value is provided in state
});

type reportForm = z.infer<typeof formSchema>;

export function ReportPage() {
  const [loading, setLoading] = useState(false);
  const [waste, setWaste] = useState({
    wasteType: "Waqar",
    estimatedAmount: "50",
  });

  const form = useForm<reportForm>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      wasteType: waste.wasteType, // Set the default value from state
      estimatedAmount: waste.estimatedAmount, // Set the default value from state
    },
  });

  const onSubmit = (data: reportForm) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="max-w-full">
      <Card className="max-w-full mx-auto p-6 mb-10">
        <VerifyingImage />
      </Card>
      <Card className="p-5 grid md:grid-cols-2 grid-cols-1 ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wasteType"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Waste Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Waste Type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedAmount"
              render={({ field }) => (
                <FormItem className="mb-5">
                  <FormLabel>Estimated Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Estimated Amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              Submit
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
