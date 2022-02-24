import * as React from 'react';
import {
    Box, Container, Divider, Typography
} from '@mui/material';
import MyComputersList from '../components/MyComputersList';
import RemoteDisplay from '../components/RemoteDisplay';

function ComputerScreen(props) {
    const RemoteDisplayReference = React.useRef();
    const handleViewToggleRequest = (computerData) => {
        RemoteDisplayReference.current.RemoteDisplayComputer(computerData)
    }

    return (
        <Box>
            <RemoteDisplay ref={RemoteDisplayReference}></RemoteDisplay>
            <Container fixed>
                <Typography variant="h3">Computers</Typography>
                <Divider />
                <Box marginTop="20px">
                    <MyComputersList viewToggleRequest={handleViewToggleRequest} />
                </Box>
            </Container>
        </Box>
    );
}

export default ComputerScreen;
