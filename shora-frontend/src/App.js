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
import NotificationsPage from './Pages/NotificationsPage';
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

function App() {
  const lightTheme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
        xxl: 2000,
      }
    },
    palette: {
      mode: 'light',
      primary: {
        main: '#e55c00',
      },
      secondary: {
        light: '#ffe900',
        main: '#ffe900',
        contrastText: '#ffcc00',
      },
    },
    direction: "rtl",
    typography: {
      fontFamily: "B Nazanin",
      fontSize: 16,
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#e55c00',
      },
      secondary: {
        light: '#ffe900',
        main: '#ffe900',
        contrastText: '#ffcc00',
      },
    },
    direction: "rtl",
    typography: {
      fontFamily: "B Nazanin",
      fontSize: 16,
    },
  });

  const [theme, setTheme] = React.useState('light');

  const [selectedItem, setSelectedItem] = React.useState("کاربران");

  React.useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setTheme(e.matches ? 'dark' : 'light'));
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', () => { });
    }
  }, []);

  return (
    <CookiesProvider>
      <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme}>
        <div dir='rtl'>
          <RecoilRoot>
            <RecoilNexus />
            <Routes>
              
              <Route index={true} element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage isForRegister="true"/>} />
              <Route path="/forgot-password" element={<RegisterPage isForRegister="false"/>} />
              <Route path="/reset-password/:hash" element={<PasswordResetPage />} />
              <Route path="/home" element={<ProtectedRoute />}>
                <Route path="" element={<HomePage selectedItem={selectedItem} setSelectedItem={setSelectedItem} />}>
                  {/* <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                  > */}
                    <Route path="users" element={<UsersPage setSelectedItem={setSelectedItem} />} />
                    <Route path="rents" element={<RentsPage setSelectedItem={setSelectedItem} />} />
                    <Route path="lockers" element={<LockersPage setSelectedItem={setSelectedItem} />} />
                    <Route path="transactions" element={<TransactionsPage setSelectedItem={setSelectedItem} />} />
                    <Route path="lost-and-found" element={<LostAndFoundPage setSelectedItem={setSelectedItem} />} />
                    <Route path="events" element={<EventsPage setSelectedItem={setSelectedItem} />}/>
                    <Route path="demands" element={<DemandsPage setSelectedItem={setSelectedItem} />} />
                    <Route path="demands/:id" element={<DemandsPage setSelectedItem={setSelectedItem}/>} />
                    <Route path="notifications" element={<NotificationsPage setSelectedItem={setSelectedItem}/>} />
                  {/* </AnimatedSwitch> */}
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
        {/* <h2>Loading...</h2> */}
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