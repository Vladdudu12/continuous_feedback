import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackbarProvider, useSnackbar } from "notistack";
import AuthProvider from "./provider/authProvider";
import IsProfessorProvider from "./provider/isProfessorProvider";
import Routes from "./routes";
import UserIdProvider from "./provider/userIdProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <IsProfessorProvider>
        <UserIdProvider>
          <AuthProvider>
            <Routes>
              <App />
            </Routes>
          </AuthProvider>
        </UserIdProvider>
      </IsProfessorProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
