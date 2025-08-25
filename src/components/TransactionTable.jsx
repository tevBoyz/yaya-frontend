import { useMemo, useCallback } from "react"
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
  const safeTransactions = useMemo(() => 
    Array.isArray(transactions) ? transactions : []
  , [transactions])
  
  const getTransactionType = useCallback((transaction) => {
    if (transaction.is_topup) return 'top-up';
    if (transaction.is_outgoing_transfer) return 'outgoing';
    return transaction.receiver.account === currentUserId ? 'incoming' : 'outgoing';
  }, [currentUserId])

  const formatDate = useCallback((timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }, [])

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
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.sender.name}</div>
                  <div className="text-sm text-muted-foreground">@{transaction.sender.account}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transaction.receiver.name}</div>
                  <div className="text-sm text-muted-foreground">@{transaction.receiver.account}</div>
                </div>
              </TableCell>
              <TableCell 
                className={type === 'incoming' || type === 'top-up' ? 'text-green-500' : 'text-red-500'}
              >
                {type === 'incoming' || type === 'top-up' ? '+' : '-'}{transaction.amount}
              </TableCell>
              <TableCell>{transaction.currency}</TableCell>
              <TableCell>{transaction.cause}</TableCell>
              <TableCell>{formatDate(transaction.created_at_time)}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}

export default TransactionTable