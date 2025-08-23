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
  const getTransactionType = (transaction) => {
    if (transaction.sender === transaction.receiver) return 'top-up'
    return transaction.receiver === currentUserId ? 'incoming' : 'outgoing'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
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
        {transactions.map((transaction) => {
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
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionTable