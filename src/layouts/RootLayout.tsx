import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";

export default function RootLayout() {
  return (
    <div className="root-layout">
      <AppBar position="sticky">
        <Container>
          <Toolbar sx={{ display: "flex", gap: "10px" }}>
            <Typography variant="h4" sx={{ marginRight: "auto" }}>
              Pocket Manager
            </Typography>
            <Link component={NavLink} underline="none" color={"#fff"} to={"/"}>
              Home
            </Link>
            <Link
              component={NavLink}
              underline="none"
              color={"#fff"}
              to={"about"}
            >
              About
            </Link>
            <Link
              component={NavLink}
              underline="none"
              color={"#fff"}
              to={"inventory"}
            >
              Inventory
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
