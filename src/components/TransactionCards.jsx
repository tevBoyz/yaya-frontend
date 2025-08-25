import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TransactionCards = ({ transactions, currentUserId }) => {
  // Make sure transactions is always an array
  const safeTransactions = Array.isArray(transactions) ? transactions : []
  
  //Get transaction type from data on server
  const getTransactionType = (transaction) => {
    if (transaction.is_topup) return 'top-up';
    if (transaction.is_outgoing_transfer) return 'outgoing';
    return transaction.receiver.account === currentUserId ? 'incoming' : 'outgoing';
  }

  // convert ms time to Aug 24, 2025, 02:01 PM
  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (safeTransactions.length === 0) {
    return (
      <div className="text-center p-8 md:hidden">
        <p>No transactions found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:hidden">
      {safeTransactions.map((transaction) => {
        const type = getTransactionType(transaction)
        return (
          <Card key={transaction.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {transaction.id.slice(0, 8)}...
              </CardTitle>
              <div>
                {type === 'incoming' || type === 'top-up' ? (
                  <ArrowDown className="text-green-500" />
                ) : (
                  <ArrowUp className="text-red-500" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">From</p>
                  <p className="font-medium">{transaction.sender.name}</p>
                  <p className="text-xs text-muted-foreground">@{transaction.sender.account}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">To</p>
                  <p className="font-medium">{transaction.receiver.name}</p>
                  <p className="text-xs text-muted-foreground">@{transaction.receiver.account}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className={type === 'incoming' || type === 'top-up' ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
                    {type === 'incoming' || type === 'top-up' ? '+' : '-'}{transaction.amount_with_currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Fee</p>
                  <p>{transaction.fee} {transaction.currency}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p>{formatDate(transaction.created_at_time)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Cause</p>
                  <p>{transaction.cause}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default TransactionCards