import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DashboardTable({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>
          Your latest waste collection activities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((activity: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{`${new Date(activity.createdAt).getDate()}/${
                  new Date(activity.createdAt).getMonth() + 1
                }/${new Date(activity.createdAt)
                  .getFullYear()
                  .toString()
                  .slice(-2)}`}</TableCell>
                <TableCell>{activity.wasteType}</TableCell>
                <TableCell>{activity.weight} Kg</TableCell>
                <TableCell><Badge className="bg-green-800 h-6">{activity.status}</Badge> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
