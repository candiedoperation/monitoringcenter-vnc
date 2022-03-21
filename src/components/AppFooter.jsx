import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function AppFooter(props) {
    return (
        <Box style={{ marginTop: "30px" }}>
            <AppBar position="static" style={{ background: "#000000" }}>
                <Toolbar>
                <Typography component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                    Copyright © 2022  Atheesh Thirumalairajan
                </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppFooter;