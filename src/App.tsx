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
  const [isPortrait, setIsPortrait] = useState(
    window.innerHeight > window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isPortrait) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "0 20px",
          textAlign: "center",
        }}
      >
        <h1>Please rotate your device</h1>
      </div>
    );
  }

  return <RouterProvider router={router} />;
}

export default App;
