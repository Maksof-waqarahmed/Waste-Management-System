"use client";

import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "./image-upload";
import { RecentReports } from "./recent-reports";
import { wasteSubmitSchema } from "@/schemas";
import { api } from "@/trpc-server/react";
import toast from "react-hot-toast";

type ReportForm = z.infer<typeof wasteSubmitSchema>;
const wasteTypeEnum = z.enum([
  "PLASTIC",
  "PAPER",
  "METAL",
  "GLASS",
  "ELECTRONIC",
]);
export function ReportWaste() {
  const [image, setImage] = useState<string | null>(null);
  const { mutateAsync: submitWaste, isLoading } =
    api.wasteSubmit.submitWaste.useMutation({
      onError: (error) => {
        console.error("API error:", error);
      },
    });

  const getChildImage = (image: string | null) => {
    setImage(image);
  };

  const form = useForm<ReportForm>({
    resolver: zodResolver(wasteSubmitSchema),
  });

  const onSubmit = async (data: ReportForm) => {
    try {
      const validatedWasteType = wasteTypeEnum.parse(data.wasteType);
      const res = await submitWaste({
        estimatedAmount: Number(data.estimatedAmount),
        image: image!,
        location: data.location,
        wasteType: validatedWasteType,
        weight: Number(data.weight),
      });
      form.reset({
        location: "",
        wasteType: "",
        estimatedAmount: "",
        weight: "",
      });
      toast.success("Waste Submitted Successfully!");
    } catch (error) {
      console.error("Unexpected error", error);
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
          <CardDescription>
            Provide information about the waste you've found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
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
                <FormField
                  control={form.control}
                  name="wasteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Waste Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select waste type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wasteTypeEnum.options.map((option) => {
                            return (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimatedAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter estimated amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (KG)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter waste weight"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ImageUpload onImageChange={getChildImage} />
              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
