import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import { StyledEngineProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StyledEngineProvider>
    </React.StrictMode>
  </React.StrictMode>
);
