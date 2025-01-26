import React from "react";
import { Calendar, Trash2, Weight, MapPin, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CollectionCardProps {
  location: string;
  wasteType: string;
  amount: number;
  createdAt: string;
  status: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  location,
  wasteType,
  amount,
  createdAt,
  status,
}) => {
  return (
    <Card className="flex flex-col h-full">
      <CardContent className="flex-grow p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-5 w-5 text-gray-500 mt-1" />
            <h3 className="font-semibold text-lg text-green-600">{location}</h3>
          </div>

          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <BadgeCheck className="h-4 w-4 mr-1" />
            Verified
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Trash2 className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{wasteType}</span>
          </div>
          <div className="flex items-center gap-2">
            <Weight className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{amount}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">{createdAt}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4">
        {status === "COMPLETED" ? (
          <p className="text-green-600 font-semibold text-sm">Reward Earned</p>
        ) : (
          <p className="text-gray-500 text-sm">No reward earned yet</p>
        )}
      </CardFooter>
    </Card>
  );
};
