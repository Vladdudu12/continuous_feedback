import * as React from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

export default function ButtonUsage() {
    return (
        <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
        </ListItemButton>
    );
}