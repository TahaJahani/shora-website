import * as React from 'react'

function Day({label, offset, height=100, width='100%'}) {
    return(
        <div style={{
            borderBottom: '1px solid #000000',
            height: height,
            position: 'absolute',
            top: offset,
            width: width,
            background: '#ffffffaf'
        }}>

        </div>
    )
}

export default Day;