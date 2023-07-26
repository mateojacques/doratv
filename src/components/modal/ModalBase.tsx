import { Dialog, Box, IconButton, Grid } from "@mui/material";
import React from "react";
import { IModalBase } from "../../interfaces/layoutInterfaces";

const ModalBase = ({ showModal, setShowModal, children }: IModalBase) => (
  <Dialog open={showModal}>
    <Box className="modal-base">
      <IconButton
        onClick={() => setShowModal(false)}
        style={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "var(--primary-text)",
        }}
      >
        <span className="material-symbols-rounded f-s-28">close</span>
      </IconButton>

      <Grid
        container
        spacing={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {children}
      </Grid>
    </Box>
  </Dialog>
);

export default ModalBase;
