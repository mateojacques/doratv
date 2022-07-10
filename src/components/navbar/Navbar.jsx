import React from "react";
import { Tab, Tabs, Box, Tooltip } from "@mui/material";
import { CellTower, OndemandVideo } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-indicatorSpan": {
    maxWidth: 40,
    width: "100%",
    background: "var(--bg-secondary)",
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "var(--primary-text)",
    "&.Mui-selected": {
      color: "var(--secondary-color)",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const Navbar = ({ view, handleViewChange }) => {
  return (
    <Box
      className="navbar"
    >
      <Box>
        <StyledTabs
          value={view}
          onChange={handleViewChange}
          aria-label="Choose view"
        >
          <StyledTab
            value="tv"
            icon={
              <Tooltip title="TV">
                <CellTower />
              </Tooltip>
            }
          />

          <StyledTab
            value="ondemand"
            icon={
              <Tooltip title="On Demand">
                <OndemandVideo />
              </Tooltip>
            }
          />
        </StyledTabs>
      </Box>
    </Box>
  );
};

export default Navbar;
