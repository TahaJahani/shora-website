import { ButtonBase, Card, CardActionArea, CardContent, CardHeader, Checkbox, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material';
import * as React from 'react'

function CourseItem({ id, name, teacher, selected, onToggle }) {
    return (
        // <ButtonBase onClick={() => onToggle(id)}>
        //     <Card variant='outlined'>
        //         <CardContent>
        //             <Typography variant='h6'>
        //                 {name}
        //             </Typography>
        //             <Typography variant='caption'>
        //                 {teacher}
        //             </Typography>
        //         </CardContent>
        //         <CardActionArea disabled>
        //             <Checkbox checked={selected}>
        //             </Checkbox>
        //         </CardActionArea>
        //     </Card>
        // </ButtonBase>
        <ListItem key={id}>
            <ListItemButton role={undefined} onClick={() => onToggle(id)}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={selected}
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