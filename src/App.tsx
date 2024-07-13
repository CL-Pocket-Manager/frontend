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
import Inventory from "./pages/Inventory/Inventory";

// layouts
import RootLayout from "./layouts/RootLayout";
import InventoryLayout from "./layouts/InventoryLayout";
import FoodInventory from "./pages/Inventory/FoodInventory";
import BeverageInventory, {
  bevInvenLoader,
} from "./pages/Inventory/BeverageInventory";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="inventory" element={<Inventory />} />
      <Route path="items" element={<Items />} />
      <Route path="items/:id" element={<ItemDetail />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
