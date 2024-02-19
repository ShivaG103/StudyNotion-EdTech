import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import {configureStore} from '@reduxjs/toolkit';
import { Toaster } from "react-hot-toast";

if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Browser is in dark mode, update favicon to dark mode
  document.getElementById('favicon').href = '/favicon.ico';
}

const store = configureStore({
  reducer:rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
