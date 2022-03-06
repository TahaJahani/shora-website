import * as React from 'react'
import Bar from "../Components/Calendar/Bar";
import Column from '../Components/Calendar/Column';
import Day from '../Components/Calendar/Day';

function CalendarPage() {
    return (
        <div style={{ position: 'relative' }}>
            <Day offset='50px' />
            <Day offset='150px' />
            <Column offset='100px' height='200px' />
            <Column offset='200px' height='200px' />
            <Bar row='1' offset='50px' length='200px' color='red' />
            <Bar row='3' offset='80px' length='200px' color='blue' />
            <Bar row='2' offset='60px' length='200px' color='grey' />
        </div>
    )
}

export default CalendarPage;