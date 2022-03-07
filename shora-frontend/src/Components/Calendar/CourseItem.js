import { ButtonBase, Card, CardActionArea, CardContent, CardHeader, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import * as React from 'react'

function CourseItem({ id, name, teacher, selected, onToggle }) {
    return (
        <ListItem key={id}>
            <ListItemButton role={undefined} onClick={() => onToggle(id)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selected ? true : false}
                        tabIndex={-1}
                        disableRipple
                    />
                </ListItemIcon>
                <ListItemText id={id} primary={name} secondary={teacher} sx={{textAlign: 'right'}} />
            </ListItemButton>
        </ListItem>
    )
}

export default CourseItem;