import * as React from 'react'
import { useParams } from "react-router-dom";
import { hasAccess } from "../Helpers/UserHelper"
import getBookData from "../AxiosCalls/Books/getBookData"
import SubmitBookForm from "../Components/Books/SubmitBookForm"
import { Backdrop, CircularProgress } from '@mui/material'

function BookPage() {
    const { id } = useParams();
    const [state, setState] = React.useState('loading');
    const [book, setBook] = React.useState();

    React.useEffect(() => {
        if (id && !isNaN(id)) {
            getBookData(id, (res) => {
                setBook(res.data.book);
                setState('show')
            }, () => {
                setState(hasAccess(['owner', 'financial']) ? 'add' : 'error')
            })
        }
    }, [])

    return (
        <div>
            {state == 'show' &&
                <div>
                    در این قسمت اطلاعات کتاب نمایش داده خواهد شد!
                    در حال حاضر تنها می‌دانیم که نام کتاب {book.name} می‌باشد.
                </div>
            }
            {state == 'add' &&
                <SubmitBookForm id={id} onSubmit={(book) => {setBook(book); setState('show')}}/>
            }
            {state == 'error' &&
                <div>
                    <h1>404</h1>
                    <h4>کتابی با این شماره یافت نشد</h4>
                </div>
            }
            <Backdrop
                invisible={true}
                open={state == 'loading'}>
                <CircularProgress color="primary" />
            </Backdrop>
        </div>
    )
}

export default BookPage