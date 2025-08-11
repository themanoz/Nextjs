import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    date: "April 7, 2025",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
];

export default function BillingData({ amount }: { amount: string }) {
  return (
    <Table className="w-3/6 mt-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>
              <Badge className="text-green-700 border-green-600 bg-transparent rounded-full">
                {invoice.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell>{invoice.date}</TableCell>
            <TableCell>${amount}.00</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total</TableCell>
          <TableCell>${amount}.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
