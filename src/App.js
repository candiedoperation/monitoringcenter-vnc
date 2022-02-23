import * as React from 'react';
import MainScreen from './screens/MainScreen';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;