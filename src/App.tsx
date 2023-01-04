import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Controller from "./modules/controller/Controller";
import Login from "./modules/auth/login/Login";
import Register from "./modules/auth/register/Register";
import PasswordReset from "./modules/auth/reset/PasswordReset";
import Init from "./modules/init/Init";
import { PathEnum } from "./enums/PathEnum";
import Drive from "./modules/drive/Drive";
import Calendar from "./modules/calendar/Calendar";
import Notes from "./modules/notes/Notes";
import { createTheme, ThemeProvider } from "@mui/material";
import AccountRetrieval from "./modules/auth/retrieve/AccountRetrieval";
import RetrieveLinkSent from "./modules/auth/linkSent/RetrieveLinkSent";
import { CookiesProvider, useCookies } from "react-cookie";
import { initializeAuth } from "./services/AuthService";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Controller />,
    children: [
      {
        path: PathEnum.LOGIN,
        element: <Login />,
      },
      {
        path: PathEnum.REGISTER,
        element: <Register />,
      },
      {
        path: PathEnum.ACCOUNT_RETRIEVAL,
        element: <AccountRetrieval />,
      },
      {
        path: PathEnum.RETRIEVE_LINK_SENT,
        element: <RetrieveLinkSent />,
      },
      {
        path: PathEnum.PASSWORD_RESET,
        element: <PasswordReset />,
      },
      {
        path: PathEnum.DRIVE,
        element: <Drive />,
      },
      {
        path: PathEnum.CALENDAR,
        element: <Calendar />,
      },
      {
        path: PathEnum.NOTES,
        element: <Notes />,
      },
      {
        path: "",
        element: <Init />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#5793FB",
    },
  },
});

const App = () => {
  const [authCookies, setAuthCookie, removeAuthCookie] = useCookies([
    "user",
    "token",
  ]);

  useEffect(() => {
    initializeAuth(authCookies, setAuthCookie, removeAuthCookie);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <RouterProvider router={router} />
      </CookiesProvider>
    </ThemeProvider>
  );
};

export default App;
