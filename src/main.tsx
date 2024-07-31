import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { InventoryProvider } from "./context/InventoryContext.tsx";
import { ItemsProvider } from "./context/ItemsContext.tsx";
import { DistributorsProvider } from "./context/DistributorContext.tsx";
import theme from "./theme";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <InventoryProvider>
        <ItemsProvider>
          <DistributorsProvider>
            <CssBaseline />
            <App />
          </DistributorsProvider>
        </ItemsProvider>
      </InventoryProvider>
    </ThemeProvider>
  </React.StrictMode>
);
