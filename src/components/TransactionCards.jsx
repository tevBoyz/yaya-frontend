import { ArrowUp, ArrowDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const TransactionCards = ({ transactions, currentUserId }) => {
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
    <div className="space-y-4 md:hidden">
      {transactions.map((transaction) => {
        const type = getTransactionType(transaction)
        return (
          <Card key={transaction.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {transaction.id}
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
                  <p>{transaction.sender}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">To</p>
                  <p>{transaction.receiver}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className={type === 'incoming' || type === 'top-up' ? 'text-green-500' : 'text-red-500'}>
                    {type === 'incoming' || type === 'top-up' ? '+' : '-'}{transaction.amount} {transaction.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p>{formatDate(transaction.createdAt)}</p>
                </div>
                <div className="col-span-2">
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