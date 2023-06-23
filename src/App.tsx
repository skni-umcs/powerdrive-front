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
import { initializeDrive } from "./services/DriveService";
import { updateView } from "./services/DimensionsService";
import { initializeCalendar } from "./services/CalendarService";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Settings from "./modules/settings/Settings";
import SettingsGeneral from "./modules/settings/components/SettingsGeneral";
import SettingsDrive from "./modules/settings/components/SettingsDrive";
import SettingsAccount from "./modules/settings/components/SettingsAccount";
import SettingsCalendar from "./modules/settings/components/SettingsCalendar";
import SettingsNotes from "./modules/settings/components/SettingsNotes";
import { SnackbarProvider } from "notistack";
import NotificationProvider from "./providers/NotificationProvider";

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
          {
            path: PathEnum.SETTINGS,
            element: <Settings />,
            children: [
              {
                path: PathEnum.GENERAL,
                element: <SettingsGeneral />,
              },
              {
                path: PathEnum.ACCOUNT,
                element: <SettingsAccount />,
              },
              {
                path: PathEnum.DRIVE,
                element: <SettingsDrive />,
              },
              {
                path: PathEnum.CALENDAR,
                element: <SettingsCalendar />,
              },
              {
                path: PathEnum.NOTES,
                element: <SettingsNotes />,
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
  const calculateVh = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
    updateView(window.innerWidth);
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
    const subscription = initializeAuth().subscribe();
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = initializeDrive().subscribe();
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const subscription = initializeCalendar().subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider autoHideDuration={5000}>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
