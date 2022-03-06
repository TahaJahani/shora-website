import * as React from 'react'

function Column({label, offset, height=100, width=100, start=50}) {
    return(
        <div style={{
            borderRight: '1px solid #000000',
            height: height,
            position: 'absolute',
            right: offset,
            top: start,
            width: width,
            // background: '#ffffffaf'
        }}>

        </div>
    )
}

export default Column

