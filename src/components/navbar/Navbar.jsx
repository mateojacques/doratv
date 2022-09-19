import React from "react";
import { Box, Typography,Link } from "@mui/material";
import { LinkedIn, GitHub, Mail, Language } from "@mui/icons-material";

const Navbar = ({ view, handleViewChange }) => {
  return (
    <Box className="navbar">
      <Box display="flex" alignItems="center">
        <Typography
          variant="body"
          sx={{
            // color: "var(--primary-text)",
            paddingRight: 1.5,
            borderRight: "2px solid var(--secondary-color)",
          }}
        >
          Mateo Jacques - Web Developer
        </Typography>
        <Box
          display="flex"
          sx={{ gap: 2, paddingLeft: 1.5, lineHeihgt: "10px" }}
        >
          <Link
            href="https://www.linkedin.com/in/mateoleonjacques"
            target="_blank"
            className="navbar__link"
          >
            <LinkedIn />
          </Link>
          <Link
            href="https://www.github.com/mateojacques"
            target="_blank"
            className="navbar__link"
          >
            <GitHub />
          </Link>
          <Link
            href="mailto:mateojacquesweb@gmail.com"
            target="_blank"
            className="navbar__link"
          >
            <Mail />
          </Link>
          <Link
            href="https://mateojacquesweb.com"
            target="_blank"
            className="navbar__link"
          >
            <Language />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
