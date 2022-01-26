import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import * as React from "react"
import FinishRentForm from "./Rent/FinishRentForm";

export default function FinishRentDialog({ isOpen, selectedRent, onSubmit, onClose, loading }) {

    return (
        <Dialog component='form' sx={{ padding: 1 }} open={isOpen} onClose={onClose}>
            <DialogTitle dir="rtl">عودت کرایه </DialogTitle>
            <DialogContent dir="rtl">
                <FinishRentForm onSubmit={onSubmit} selectedRent={selectedRent} loading={loading} />
            </DialogContent>
        </Dialog >
    )
}