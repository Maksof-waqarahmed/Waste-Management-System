"use client";

import { useForm } from "react-hook-form";
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
import { Upload } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { Label } from "../ui/label";

export function VerifyingImage() {
  const [preview, setPreview] = useState<any>(null);

  const form = useForm();

  const onSubmit = () => {};

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Form {...form}>
        <div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="">
                      <Label
                        htmlFor=""
                        className="text-base font-semibold text-gray-700"
                      >
                        Upload Waste Image
                      </Label>
                      <div className="flex justify-center items-center px-6 pt-5 border-4 border-dotted border-gray-700 hover:border-green-700 rounded-lg mt-5">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-700 hover:text-green-700" />
                          <div className="text-sm text-gray-600 text-center">
                            <Label
                              htmlFor="image-upload"
                              className="cursor-pointer rounded-md font-bold"
                            >
                              <span className="text-green-700">
                                Upload a file
                              </span>
                              <Input
                                type="file"
                                name="image-upload"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </Label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500 pb-4">
                            PNG, JPG, GIF, upto 10MB
                          </p>
                        </div>
                      </div>
                      {preview && (
                        <div className="mt-4 mb-8 flex justify-center">
                          <Image
                            src={preview}
                            alt="Waste Preview"
                            className="max-w-full h-auto rounded-xl shadow-md object-cover"
                            width={400}
                            height={400}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-center">
              <Button
                type="submit"
                disabled={!preview}
                className="w-[700px]"
              >
                Verifying Waste
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
