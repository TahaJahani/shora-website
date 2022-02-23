import * as React from 'react'
import { useRecoilState } from 'recoil'
import AddTransactionForm from '../Components/Transactions/AddTransactionForm'
import TransactionsGrid from '../Components/Transactions/TransactionsGrid'
import { transactionsAtom } from '../Atoms/transactionsAtom'
import getTransactions from "../AxiosCalls/Transactions/getTransactions"
import { Dialog, Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default function TransactionsPage({ setSelectedItem }) {

    const [transactions, setTransaction] = useRecoilState(transactionsAtom);

    React.useEffect(() => {
        setSelectedItem('تراکنش‌ها');
        if (!transactions)
            getTransactions(() => { }, () => { })
    }, [])

    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
        <div style={{ height: '100%' }}>
            <ReactCSSTransitionGroup
                transitionAppear={true}
                transitionAppearTimeout={600}
                transitionEnterTimeout={600}
                transitionLeaveTimeout={200}
                transitionName={'SlideIn'}
            >
                <TransactionsGrid transactions={transactions} />
            </ReactCSSTransitionGroup>

            <Dialog
                style={{ borderRadius: 20 }}
                dir='rtl'
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                fullWidth={true}
                maxWidth='md'>
                <AddTransactionForm onCancel={() => setDialogOpen(false)} />
            </Dialog>

            <Fab
                sx={{
                    margin: 1,
                    position: "fixed",
                    bottom: 8,
                    left: 8
                }}
                onClick={() => setDialogOpen(true)}
                variant='extended'
                color='primary'>
                <AddIcon sx={{ ml: 0.5 }} />
                ثبت تراکنش جدید
            </Fab>
        </div>
    )
}