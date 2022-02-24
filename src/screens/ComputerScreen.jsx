import * as React from 'react';
import {
    Box, Container, Divider, Typography, Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import MyComputersList from '../components/MyComputersList';
import VncStreamer from '../components/VncStreamer';
import getAvailableSessions from '../controllers/sessionController';

function ComputerScreen(props) {
    const [viewerOpen, setViewerOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [snackbarText, setSnackbarText] = React.useState('');
    const [currentSession, setCurrentSession] = React.useState({});
    let availableSessions = {};

    function switchComputer(computerData) {
        if (computerData) {
            getAvailableSessions(computerData, (err, availSessions) => {
                if (err) {
                    setViewerOpen(false);
                    setSnackbarText(err.message);
                    setSnackbarOpen(true);
                } else {
                    console.log(availSessions);
                    availableSessions = availSessions;

                    switchSession(0);
                    setViewerOpen(true);
                }
            })
        } else {
            setViewerOpen(false);
        }
    }

    function switchSession(sessionIndex) {
        setCurrentSession(() => (
            availableSessions[
            Object.keys(availableSessions)[sessionIndex]
            ]
        ));
    }

    return (
        <Box>
            <Container fixed>
                <Typography variant="h3">Computers</Typography>
                <Divider />
                <Box marginTop="20px">
                    <MyComputersList viewToggleRequest={switchComputer} />
                </Box>
            </Container>
            <VncStreamer
                isViewerOpen={viewerOpen}
                currentSession={currentSession}
                viewToggleRequest={switchComputer}
            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => { setSnackbarOpen(false); }}
            >
                <MuiAlert elevation={6} variant="filled" severity="error">{snackbarText}</MuiAlert>
            </Snackbar>
        </Box>
    );
}

export default ComputerScreen;
