import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Request {
  orderId: string;
  requestType: string;
  requestDate: string;
  currentStatus: "Pending" | "Approved" | "In Progress" | "Completed" | "Rejected";
}

interface RequestSummaryGridProps {
  requests: Request[];
}

const getStatusVariant = (status: Request["currentStatus"]) => {
  switch (status) {
    case "Completed":
      return "default";
    case "Approved":
      return "secondary";
    case "In Progress":
      return "outline";
    case "Pending":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusColor = (status: Request["currentStatus"]) => {
  switch (status) {
    case "Completed":
      return "bg-success text-success-foreground";
    case "Approved":
      return "bg-icici-blue text-white";
    case "In Progress":
      return "bg-warning text-warning-foreground";
    case "Pending":
      return "bg-muted text-muted-foreground";
    case "Rejected":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function RequestSummaryGrid({ requests }: RequestSummaryGridProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">User Request Summary</CardTitle>
        <CardDescription>
          Track your recent requests and their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Order ID</TableHead>
                <TableHead className="font-semibold">Request Type</TableHead>
                <TableHead className="font-semibold">Request Date</TableHead>
                <TableHead className="font-semibold">Current Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                    No requests found
                  </TableCell>
                </TableRow>
              ) : (
                requests.map((request) => (
                  <TableRow key={request.orderId} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{request.orderId}</TableCell>
                    <TableCell>{request.requestType}</TableCell>
                    <TableCell>{request.requestDate}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(request.currentStatus)}>
                        {request.currentStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}