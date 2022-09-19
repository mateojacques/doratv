import React from "react";
import { Grid, Typography } from "@mui/material";
import parse from "html-react-parser";
import ModalBase from "./ModalBase";

const ModalMessage = ({ showModal, setShowModal, message, title }) => {
  return (
    <ModalBase showModal={showModal} setShowModal={setShowModal}>
      <Grid
        container
        item
        className="modal-message m-30"
        justifyContent={"center"}
        alignItems={"center"}
      >
        {title && <Typography variant="h2" marginBottom={3}>{title}</Typography>}

        <Typography variant="body1">{parse(message)}</Typography>
      </Grid>
    </ModalBase>
  );
};

export default ModalMessage;
