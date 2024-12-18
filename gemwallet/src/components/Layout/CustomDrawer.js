import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  Skeleton,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Logos
import MainVectorLogo from "../../assets/mainLogo.svg";

// Router
import { useLocation, useNavigate } from "react-router-dom";

// Layout routes
import LayoutRoutes from "../Routes/LayoutRoutes";

// Lazy Image Component
const LazyImageComponent = React.lazy(() =>
  import("../LazyImageComponent/LazyImageComponent")
);

const CustomDrawer = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const navigateAndCloseDrawer = (path) => {
    navigate(path);
    if (isMobile) {
      handleDrawerToggle();
    }
  };

  return (
    <div>
      <Box sx={{ mt: 4, ml: 8 }}>
        <React.Suspense
          fallback={
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              sx={{
                backgroundColor: `${
                  theme.palette.mode === "dark" ? "#111" : "#f5f5f5"
                }`,
              }}
            />
          }
        >
          <LazyImageComponent
            style={{ width: "25%", display: "block" }}
            src={MainVectorLogo}
          />
        </React.Suspense>
      </Box>
      <Toolbar />
      <List>
        {LayoutRoutes.map((routes) => (
          <Box key={routes.id}>
            <ListItem
              onClick={() => navigateAndCloseDrawer(`/wallets${routes.path}`)}
              button
            >
              {location.pathname === `/wallets${routes.path}` ? (
                <>
                  <Divider
                    sx={{
                      backgroundColor: "#00aaff",
                      width: "3px",
                      position: "relative",
                      right: "6%",
                    }}
                    orientation="vertical"
                    flexItem
                  />
                  <Typography
                    fontWeight={400}
                    ml={3}
                    py={3}
                    color="primary"
                    variant="body2"
                  >
                    {routes.name}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    fontWeight={400}
                    ml={3}
                    py={3}
                    color="secondary"
                    variant="body2"
                  >
                    {routes.name}
                  </Typography>
                </>
              )}
            </ListItem>
          </Box>
        ))}
        <ListItem
          sx={{ mb: 1 }}
          onClick={() => navigateAndCloseDrawer("/account")}
          button
        >
          {location.pathname === "/account" ? (
            <>
              <Divider
                sx={{
                  backgroundColor: "#00aaff",
                  width: "3px",
                  position: "relative",
                  right: "6%",
                }}
                orientation="vertical"
                flexItem
              />
              <Typography
                fontWeight={400}
                ml={3}
                py={3}
                color="primary"
                variant="body2"
              >
                Account
              </Typography>
            </>
          ) : (
            <>
              <Typography
                fontWeight={400}
                ml={3}
                py={3}
                color="secondary"
                variant="body2"
              >
                Account
              </Typography>
            </>
          )}
        </ListItem>
      </List>
    </div>
  );
};

export default CustomDrawer;
