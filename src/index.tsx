import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from "@mui/material/styles";
import { createTheme} from "@mui/material";
import { colors } from '@mui/material';

import { Provider } from "react-redux";
import { store } from "./services/store/store";

const customTheme = createTheme({
  typography: {
    fontFamily:"Open Sans"
  },
  status: {
    danger:colors.red[900]
  },
  palette: {
    mode:"dark",
    primary: {
      main: "#1976d2",
      contrastText: "white",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
