import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Items from "./pages/Items";
import ItemDetail from "./pages/ItemDetail";

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
      <Route path="items" element={<Items />} />
      <Route path="items/:id" element={<ItemDetail />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
