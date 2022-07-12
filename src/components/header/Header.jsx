import React from "react";
import { Grid, IconButton } from "@mui/material";
import Logo from "../logo/Logo";

const Header = ({setShowModal}) => {
  return (
    <Grid
      container
      component="header"
      id="header"
      justifyContent={"space-between"}
    >
      <Logo color="var(--secondary-color)"/>

      <IconButton
          onClick={() => setShowModal(true)}
          style={{
            color: "var(--warning-color)",
            width: 60,
            height: 60
          }}
          disableRipple
        >
          <span className="material-symbols-rounded">
            info
          </span>
        </IconButton>
    </Grid>
  );
};

export default Header;
