import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect, useState } from "react";

// pages
import Home from "./pages/Home";
import About from "./pages/About";

// layouts
import RootLayout from "./layouts/RootLayout";
import InventoryLayout from "./layouts/InventoryLayout";
import FoodInventory from "./pages/inventory/FoodInventory";
import BeverageInventory, {
  bevInvenLoader,
} from "./pages/inventory/BeverageInventory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="inventory" element={<InventoryLayout />}>
        <Route path="food" element={<FoodInventory />} />
        <Route
          path="beverage"
          element={<BeverageInventory />}
          loader={bevInvenLoader}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
