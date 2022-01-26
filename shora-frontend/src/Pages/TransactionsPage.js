import * as React from 'react'
import { useRecoilState } from 'recoil'
import AddTransactionForm from '../Components/Transactions/AddTransactionForm'
import TransactionsGrid from '../Components/Transactions/TransactionsGrid'
import { transactionsAtom } from '../Atoms/transactionsAtom'
import getTransactions from "../AxiosCalls/Transactions/getTransactions"

export default function TransactionsPage() {

    const [transactions, setTransaction] = useRecoilState(transactionsAtom);

    React.useEffect(() => {
        if (!transactions)
            getTransactions(() => {}, () => {})
    }, [])

    return (
        <div>
            <AddTransactionForm />
            <TransactionsGrid transactions={transactions}/>
        </div>
    )
}