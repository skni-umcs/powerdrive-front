import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Controller from "./modules/controller/Controller";
import Login from "./modules/auth/login/Login";
import Registration from "./modules/auth/registration/Registration";
import PasswordReset from "./modules/auth/components/PasswordReset";
import Init from "./modules/init/Init";
import { PathEnum } from "./enums/PathEnum";
import Drive from "./modules/drive/Drive";
import Calendar from "./modules/calendar/Calendar";
import Notes from "./modules/notes/Notes";
import { createTheme, ThemeProvider } from "@mui/material";

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
        element: <Registration />,
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
