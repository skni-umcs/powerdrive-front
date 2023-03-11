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
import WebApp from "./modules/webapp/WebApp";
import DriveHome from "./modules/drive/components/files/DriveHome";
import DriveShared from "./modules/drive/components/shared/DriveShared";
import DriveFavorites from "./modules/drive/components/favorites/DriveFavorites";
import DriveDeleted from "./modules/drive/components/deleted/DriveDeleted";
import NotesHome from "./modules/notes/components/home/NotesHome";
import NotesShared from "./modules/notes/components/shared/NotesShared";
import NotesFavorites from "./modules/notes/components/favorites/NotesFavorites";
import NotesDeleted from "./modules/notes/components/deleted/NotesDeleted";

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
        path: PathEnum.APP,
        element: <WebApp />,
        children: [
          {
            path: PathEnum.DRIVE,
            element: <Drive />,
            children: [
              {
                path: PathEnum.HOME + "/*",
                element: <DriveHome />,
              },
              {
                path: PathEnum.SHARED,
                element: <DriveShared />,
              },
              {
                path: PathEnum.FAVORITES,
                element: <DriveFavorites />,
              },
              {
                path: PathEnum.DELETED,
                element: <DriveDeleted />,
              },
            ],
          },
          {
            path: PathEnum.CALENDAR,
            element: <Calendar />,
          },
          {
            path: PathEnum.NOTES,
            element: <Notes />,
            children: [
              {
                path: PathEnum.HOME,
                element: <NotesHome />,
              },
              {
                path: PathEnum.SHARED,
                element: <NotesShared />,
              },
              {
                path: PathEnum.FAVORITES,
                element: <NotesFavorites />,
              },
              {
                path: PathEnum.DELETED,
                element: <NotesDeleted />,
              },
            ],
          },
        ],
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
  const [authCookies] = useCookies(["user", "token"]);

  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  };

  useEffect(() => {
    calculateVh();
    window.addEventListener("resize", calculateVh);
    window.addEventListener("orientationchange", calculateVh);

    return () => {
      window.removeEventListener("resize", calculateVh);
      window.removeEventListener("orientationchange", calculateVh);
    };
  }, []);

  useEffect(() => {
    initializeAuth(authCookies);
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
