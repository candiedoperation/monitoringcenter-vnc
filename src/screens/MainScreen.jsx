import Box from '@mui/material/Box';
import {
  Routes,
  Route,
} from 'react-router-dom';
import * as React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import ComputerScreen from './ComputerScreen';
import RequireAuth from '../components/RequireAuth';

function MainScreen() {
  const hapticNavigationExecutor = (actionPerformed) => {

  };

  return (
    <Box>
      <AppBarComponent navigationReply={hapticNavigationExecutor} />
      <Box marginTop="20px">
        <Routes>
          <Route
            path="/computers"
            element={
              <RequireAuth>
                <ComputerScreen />
              </RequireAuth>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
}

export default MainScreen;
