import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
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
    backgroundColor: "var(--bg-secondary)",
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
      color: "var(--bg-secondary)",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

const Navbar = ({ view, handleViewChange }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ bgcolor: "var(--bg-primary)" }}>
        <StyledTabs
          value={view}
          onChange={handleViewChange}
          aria-label="Choose view"
        >
          <StyledTab icon={<CellTower />} />
          <StyledTab icon={<OndemandVideo />} />
        </StyledTabs>
      </Box>
    </Box>
  );
};

export default Navbar;
