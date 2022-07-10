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
            color: "var(--warning-color)"
          }}
        >
          <span className="material-symbols-rounded f-s-28">
            info
          </span>
        </IconButton>
    </Grid>
  );
};

export default Header;
