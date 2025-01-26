"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageUploadProps {
  onImageChange: (image: string | null) => void;
}
export function ImageUpload({ onImageChange }: ImageUploadProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onImageChange(null);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    onImageChange(null);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <Label htmlFor="image-upload">Upload Image</Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && (
            <div className="mt-4 relative">
              <Image
                src={image}
                alt="Uploaded waste"
                width={300}
                height={200}
                className="rounded-md object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Remove image</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
