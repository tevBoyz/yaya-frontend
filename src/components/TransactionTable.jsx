// src/components/TransactionTable.jsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUp, ArrowDown } from "lucide-react"

const TransactionTable = ({ transactions, currentUserId }) => {
  // Ensure transactions is always an array
  const safeTransactions = Array.isArray(transactions) ? transactions : []
  
  const getTransactionType = (transaction) => {
    if (transaction.sender === transaction.receiver) return 'top-up'
    return transaction.receiver === currentUserId ? 'incoming' : 'outgoing'
  }

  const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  if (safeTransactions.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No transactions found.</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Sender</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Currency</TableHead>
          <TableHead>Cause</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {safeTransactions.map((transaction) => {
          const type = getTransactionType(transaction)
          return (
            <TableRow key={transaction.id}>
              <TableCell>
                {type === 'incoming' || type === 'top-up' ? (
                  <ArrowDown className="text-green-500" />
                ) : (
                  <ArrowUp className="text-red-500" />
                )}
              </TableCell>
              <TableCell className="font-medium">{transaction.id}</TableCell>
              <TableCell>{transaction.sender}</TableCell>
              <TableCell>{transaction.receiver}</TableCell>
              <TableCell 
                className={type === 'incoming' || type === 'top-up' ? 'text-green-500' : 'text-red-500'}
              >
                {type === 'incoming' || type === 'top-up' ? '+' : '-'}{transaction.amount}
              </TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>{transaction.cause}</TableCell>
              <TableCell>{formatDate(transaction.created_at)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionTable