import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import NavDrawer from '../components/NavDrawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function AppBarComponent(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <NavDrawer onNavigation={props.navigationReply} inheritDrawerOpen={true} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Monitoring Center
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default AppBarComponent;