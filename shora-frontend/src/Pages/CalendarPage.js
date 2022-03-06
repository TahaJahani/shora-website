import * as React from 'react'
import Bar from "../Components/Calendar/Bar";

function CalendarPage() {
    return (
        <div style={{position: 'relative'}}>
            <Bar row='1' offset='50px' length='200px' color='red' />
            <Bar row='3'offset='80px' length='200px' color='blue' />
            <Bar row='2' offset='60px' length='200px' color='grey' />
        </div>
    )
}

export default CalendarPage;