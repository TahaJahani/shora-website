import * as React from 'react'
import { Tooltip, Typography, Menu, MenuItem } from '@mui/material'
import SubmitProblemForm from '../ReportProblem/SubmitProblemForm'
import translate from '../../Helpers/translate'

function Bar({ assignment, row, offset, length, width = 36, color, columnWidth =
    64 }) {
    let right = (row * columnWidth) - (columnWidth - width) / 2 + 4

    const openTab = () => {
        if (assignment.link)
            window.open(assignment.link, '_blank')
    }

    const [contextMenu, setContextMenu] = React.useState(null);
    const [dialogOpen, setDialogOpen] = React.useState(false)

    const handleContextMenu = (event) => {
        event.preventDefault();
        setContextMenu(
            contextMenu === null
                ? {
                    mouseX: event.clientX - 2,
                    mouseY: event.clientY - 4,
                }
                : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
                // Other native context menus might behave different.
                // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
                null,
        );
    };

    const handleClose = () => {
        setContextMenu(null);
    };

    const openDialog = () => {
        setDialogOpen(true)
        handleClose();
    }

    const closeDialog = () => setDialogOpen(false)

    return (
        <div onContextMenu={handleContextMenu}>
            <SubmitProblemForm open={dialogOpen} onSuccess={closeDialog} onFailure={closeDialog} reportable={{id: assignment.id, type: 'assignment'}} />
            <Tooltip
                followCursor={true}
                title={
                    <div>
                        <Typography sx={{ textAlign: 'center' }}>
                            {translate(assignment.type)}
                        </Typography>
                        <Typography variant='caption'>
                            {assignment.description}
                        </Typography>
                    </div>
                }
                arrow>
                <div className='calendar_bar' style={{
                    width: width,
                    height: length,
                    background: color,
                    position: 'absolute',
                    display: 'block',
                    top: offset,
                    right: right,
                    cursor: 'pointer',
                    // boxShadow: '2px 2px 4px #888888',
                    borderRadius: '4px',
                }} onClick={openTab}>

                </div>
            </Tooltip>
            <Menu
                open={contextMenu !== null}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
            >
                <MenuItem onClick={openDialog}>گزارش مشکل</MenuItem>
            </Menu>
        </div>
    )
}

export default Bar;