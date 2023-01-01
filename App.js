
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CreateAccount from './CreateAccount.js';
import Dashboard from './Dashboard.js';
import { auth } from './firebaseConfig.js';
import LoginPage from './LoginPage.js';

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,75,173)"
    },
    secondary: {
      main: "rgb(50,57,77)"
    }
  }
});

function App() {
  const [user, loading, error] = useAuthState(auth);



  return (
    <div className="App">
      <ThemeProvider theme={theme}>

        <Router>
          <Routes>
            <Route exact path="/dashboard" element={user == null ? <Navigate to="/login" /> : <Dashboard user={user} />} />
            <Route exact path='/login' element={user == null ? <LoginPage /> : <Navigate to="/dashboard" />} />
            <Route exact path="/newUser" element={user == null ? <CreateAccount /> : <Navigate to="/dashboard" />} />
            <Route exact path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
