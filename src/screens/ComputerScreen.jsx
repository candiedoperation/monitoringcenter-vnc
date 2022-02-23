import * as React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import MyComputersList from '../components/MyComputersList';
import VncStreamer from '../components/VncStreamer';

const PingTest = (props) => {
    function pingComputer(ipDnsAddress) {
        fetch('http://localhost:3001/ping', { method: 'POST' })
            .then((response) => {
                if (response.status === 200) {
                    console.log('success');
                } else {
                    console.log('error');
                }
            })
            .catch((error) => {
                console.log('network error: ' + error);
            })
    }

    const [viewerOpen, setViewerOpen] = React.useState(false);
    const [currentComputer, setCurrentComputer] = React.useState({});

    function streamVNCID(computerData) {
        setViewerOpen(!viewerOpen);
        if (computerData)
            setCurrentComputer(computerData);
    }

    return (
        <Box>
            <Container fixed>
                <Typography variant='h3'>Computers</Typography>
                <Divider />
                <Box marginTop={"20px"}>
                    <MyComputersList viewToggleRequest={streamVNCID} />
                </Box>
            </Container>
            <VncStreamer 
                isViewerOpen={viewerOpen} 
                appbarTitle={currentComputer.name}
                wsUrl={`ws://${currentComputer.address}`}
                viewToggleRequest={streamVNCID}
            />
        </Box>
    );
};

export default PingTest;