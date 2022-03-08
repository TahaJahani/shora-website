import * as React from 'react'
import Day from './Day'

function DaysGrid({ firstDate, lastDate, setting, numSelectedCourses }) {
    let range = Array.from(Array(Math.floor((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)) + 1).keys())
    return (
        <div>
            {range.map(i => {
                let offset = (i) * setting.rowHeight
                return <Day key={i} height={setting.rowHeight} offset={offset} width={numSelectedCourses * setting.columnWidth + 38} />
            })}
        </div>
    )
}

export default DaysGrid;