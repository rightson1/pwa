import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import React from "react"

export default function SimpleSnackbar({ message, open, setOpen, error }) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color={error ? 'error' : 'success'} size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color={error ? 'error' : 'success'}
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    );
}