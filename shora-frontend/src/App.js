import logo from './logo.svg';
import './App.css';
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import MainPage from './Pages/MainPage';
import UsersPage from './Pages/UsersPage'
import RentsPage from './Pages/RentsPage';
import LockersPage from './Pages/LockersPage';
import EventsPage from './Pages/EventsPage';
import RegisterPage from './Pages/RegisterPage';
import PasswordResetPage from './Pages/PasswordResetPage';
import React from 'react'
import { CookiesProvider, useCookies } from 'react-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { RecoilRoot, useRecoilState, } from 'recoil';
import { userAtom } from './Atoms/userAtom';
import RecoilNexus from 'recoil-nexus';
import TransactionsPage from './Pages/TransactionsPage';
import LostAndFoundPage from "./Pages/LostAndFoundPage";
import DemandsPage from './Pages/DemandsPage';

require('dotenv').config()

function App() {

  const theme = createTheme({
    direction: "rtl",
    typography: {
      fontFamily: "B nazanin",
      fontSize: 16,
    },
  })

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <div dir='rtl'>
          <RecoilRoot>
            <RecoilNexus />
            <Routes>
              <Route index={true} element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/reset-password/:hash" element={<PasswordResetPage />} />
              <Route path="/home" element={<ProtectedRoute />}>
                <Route path="" element={<HomePage />}>
                  <Route path="users" element={<UsersPage />} />
                  <Route path="rents" element={<RentsPage />} />
                  <Route path="lockers" element={<LockersPage />} />
                  <Route path="transactions" element={<TransactionsPage />} />
                  <Route path="lost-and-found" element={<LostAndFoundPage />} />
                  <Route path="events" element={<EventsPage />}/>
                  <Route path="demands" element={<DemandsPage />} />
                </Route>
              </Route>
            </Routes>
          </RecoilRoot >
        </div>
      </ThemeProvider>
    </CookiesProvider>
  );
}

function ProtectedRoute() {
  const [user, setUser] = useRecoilState(userAtom);
  const [userCookie, setUserCookie] = useCookies(['user'])

  if (userCookie && userCookie.user && !user) {
    setUser(userCookie.user)
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    )
  }
  return (
    (user && user.token) ? <Outlet />
      : (!userCookie || !userCookie.user) && <Navigate
        to={{
          pathname: "/login",
          // state: { from: location }
        }} />
  )
}

export default App;