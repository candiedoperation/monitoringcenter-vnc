import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DevicesIcon from '@mui/icons-material/Devices';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import NavListItem from './NavListItem';

const NavDrawer = (props) => {
    const [drawerOpen, setDrawerOpen] = React.useState();

    const DrawerLayout = (propsInternal) => {
        return (
            <Box
                sx={250}
                minWidth={250}
                role="presentation"
                onClick={() => { setDrawerOpen(false) }}
                onKeyDown={() => { setDrawerOpen(false) }}
            >
                <List>
                    <NavListItem icon={<DevicesIcon />} internalKey="cStat" title="My Computers" onListPressed={() => {}} />
                </List>
            </Box>
        );
    };

    return (
        <div>
            <Drawer
                anchor={'left'}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(false) }}
            >
                <DrawerLayout onNavigation={props.onNavigation}></DrawerLayout>
            </Drawer>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => { setDrawerOpen(!drawerOpen) }}
            >
                <MenuIcon />
            </IconButton>
        </div>
    );
}

export default NavDrawer;