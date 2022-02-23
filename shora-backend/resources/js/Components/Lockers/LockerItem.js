import * as React from 'react'
import { Box, Card, CardContent, CardHeader, IconButton, Grid, ButtonBase } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import colors from "../../Data/colors";

export default function LockerItem({ locker, onClick }) {
    let isRented = locker.rents.length > 0
    let letter = locker.letter
    let number = locker.number
    let color = isRented ? colors.error.light : colors.success.light;

    return (
        <ButtonBase onClick={onClick} sx={{ width: '100%' }}>
            <Card sx={{ height: "150px", width: '100%', borderRadius: 3 }} className="demand-card-bg on-hover-grey">
                <CardContent>
                    <Box mb={6} sx={{ textAlign: 'center', border: "1px solid " + color, borderRadius: "4px", color: color, padding: "4px", fontFamily: "arial", fontSize: "18px" }}>
                        {letter.toUpperCase() + number}
                    </Box>
                    <Grid container justifyContent={'center'} sx={{ color: color, }}>
                        {isRented ? <CancelIcon /> : <CheckCircleIcon />}
                    </Grid>
                </CardContent>
            </Card>
        </ButtonBase>
    )
}