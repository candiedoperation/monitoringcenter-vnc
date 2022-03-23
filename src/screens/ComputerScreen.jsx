import * as React from 'react';
import {
    Box, Button, Container, Divider, Typography
} from '@mui/material';
import { MyComputersList, MyComputersGrid } from '../components/MyComputersList';
import RemoteDisplay from '../components/RemoteDisplay';

function ComputerScreen(props) {
    const [isListView, setListView] = React.useState(false);
    const RemoteDisplayReference = React.useRef();
    const handleViewToggleRequest = (computerData, callback) => {
        RemoteDisplayReference.current.RemoteDisplayComputer(computerData, callback)
    }

    return (
        <Box>
            <RemoteDisplay ref={RemoteDisplayReference}></RemoteDisplay>
            <Container fixed>
                <Box style={{ display: 'flex' }}>
                    <Typography style={{ flexGrow: 1 }} variant="h3">Computers</Typography>
                    <Box style={{ alignSelf: 'center' }}>
                        <Button variant='contained' onClick={() => { setListView(!isListView) }}>
                            {
                                (isListView == true) ?
                                    "Show Grid View" :
                                    "Show List View"
                            }
                        </Button>
                    </Box>
                </Box>
                <Divider />
                <Box marginTop="20px">
                    {
                        (isListView == true) ?
                        <MyComputersList viewToggleRequest={handleViewToggleRequest} /> :
                        <MyComputersGrid viewToggleRequest={handleViewToggleRequest} />
                    }
                </Box>
            </Container>
        </Box>
    );
}

export default ComputerScreen;
