import * as React from 'react';
import MainScreen from './screens/MainScreen';
import { ThemeProvider, createTheme } from '@mui/material';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const monitoringcenterTheme = createTheme({
    palette: {
      primary: {
        main: '#E91E63'
      }
    }
  });

  return (
    <ThemeProvider theme={monitoringcenterTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<MainScreen />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;