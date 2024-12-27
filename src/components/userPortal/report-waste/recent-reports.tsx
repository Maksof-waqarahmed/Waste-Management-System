import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
  const recentReports = [
    {
      id: 1,
      location: "Orangi Town",
      wasteType: "Plastic",
      estimatedAmount: 120,
      date: "2023-06-15",
    },
    {
      id: 2,
      location: "Lyari",
      wasteType: "Paper",
      estimatedAmount: 80,
      date: "2023-06-14",
    },
    {
      id: 3,
      location: "Saddar",
      wasteType: "Metal",
      estimatedAmount: 200,
      date: "2023-06-13",
    },
    {
      id: 4,
      location: "Clifton",
      wasteType: "Glass",
      estimatedAmount: 150,
      date: "2023-06-12",
    },
  ]
  
  export function RecentReports() {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Latest waste reports submitted by users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Waste Type</TableHead>
                <TableHead>Estimated Amount (kg)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.location}</TableCell>
                  <TableCell>{report.wasteType}</TableCell>
                  <TableCell>{report.estimatedAmount}</TableCell>
                  <TableCell>{report.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }
  
  