import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function RootLayout() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div className="root-layout">
      <AppBar position="sticky">
        <Container>
          <Toolbar sx={{ display: "flex", gap: "10px" }}>
            <Link
              component={NavLink}
              underline="none"
              color={"#fff"}
              to={"/"}
              sx={{ marginRight: "auto" }}
            >
              <Typography variant="h4">
                {mobile ? "PM" : "Pocket Manager"}
              </Typography>
            </Link>
            <Link
              component={NavLink}
              underline="none"
              color={"#fff"}
              to={"inventory"}
            >
              Inventory
            </Link>
            <Link
              component={NavLink}
              underline="none"
              color={"#fff"}
              to={"items"}
            >
              Items
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
