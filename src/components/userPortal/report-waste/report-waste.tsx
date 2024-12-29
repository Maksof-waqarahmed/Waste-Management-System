"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpload } from "./image-upload"
import { RecentReports } from "./recent-reports"

const formSchema = z.object({
  location: z.string().min(1, "Location is required"),
  wasteType: z.string().min(1, "Waste type is required"),
  estimatedAmount: z.string().min(1, "Estimated amount is required"),
  description: z.string().optional(),
})

type ReportForm = z.infer<typeof formSchema>

export function ReportWaste() {
  const [loading, setLoading] = useState(false)

  const form = useForm<ReportForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      wasteType: "",
      estimatedAmount: "",
      description: "",
    },
  })

  const onSubmit = async (data: ReportForm) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    form.reset()
  }

  return (
    <div className="space-y-10">
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
                          <SelectItem value="plastic">Plastic</SelectItem>
                          <SelectItem value="paper">Paper</SelectItem>
                          <SelectItem value="metal">Metal</SelectItem>
                          <SelectItem value="glass">Glass</SelectItem>
                          <SelectItem value="organic">Organic</SelectItem>
                          <SelectItem value="electronic">Electronic</SelectItem>
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
                      <FormLabel>Estimated Amount (kg)</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide additional details"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ImageUpload />
              <div className="flex justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <RecentReports />
    </div>
  )
}

