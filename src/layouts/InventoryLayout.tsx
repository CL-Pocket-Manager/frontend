// import { Outlet, NavLink } from "react-router-dom";
// import { Link } from "@mui/material";
import { Container } from "@mui/material";
import FoodInventory from "../pages/inventory/FoodInventory";

export default function InventoryLayout() {
  return (
    <div className="inventory-layout">
      <Container>
        <h2>Inventory</h2>
        {/* <nav>
          <Link component={NavLink} underline="none" to={"food"}>
            Food
          </Link>
          <Link component={NavLink} underline="none" to={"beverage"}>
            beverage
          </Link>
        </nav> */}

        <FoodInventory />
        {/* <Outlet /> */}
      </Container>
    </div>
  );
}
