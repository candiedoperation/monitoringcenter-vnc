import * as React from 'react';
import { ListItem, ListItemText, ListItemIcon } from '@mui/material';

const NavListItem = (props) => {
    return (
        <ListItem button key={props.internalKey} onClick={props.onListPressed}>
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.title} />
        </ListItem>);
}

export default NavListItem;