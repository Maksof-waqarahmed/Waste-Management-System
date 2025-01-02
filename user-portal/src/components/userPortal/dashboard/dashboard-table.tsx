import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const recentActivities = [
  { date: "2023-06-01", type: "Plastic", amount: "5 kg", points: 10 },
  { date: "2023-06-03", type: "Paper", amount: "3 kg", points: 6 },
  { date: "2023-06-05", type: "Glass", amount: "2 kg", points: 4 },
  { date: "2023-06-07", type: "Metal", amount: "1 kg", points: 3 },
]

export default function DashboardTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest waste collection activities</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Points Earned</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivities.map((activity, index) => (
              <TableRow key={index}>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.amount}</TableCell>
                <TableCell>{activity.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

