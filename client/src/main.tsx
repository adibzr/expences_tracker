import React from "react";
import ReactDOM from "react-dom/client";
//redux-toolkit
import { store } from "./store";
import { StyledEngineProvider } from "@mui/material";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
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
