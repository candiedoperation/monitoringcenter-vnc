import Box from '@mui/material/Box';
import {
  Routes,
  Route,
} from 'react-router-dom';
import * as React from 'react';
import AppBarComponent from '../components/AppBarComponent';
import AppFooter from '../components/AppFooter';
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
            path="/"
            element={
              <RequireAuth>
                <ComputerScreen />
              </RequireAuth>
            }
          />
        </Routes>
        <AppFooter />
      </Box>
    </Box>
  );
}

export default MainScreen;
