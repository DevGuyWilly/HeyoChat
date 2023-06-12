import React from "react";
import {
  Box,
  Button,
  TextField,
  FormLabel,
  useMediaQuery,
  Typography,
  InputBase,
  InputAdornment,
  IconButton,
} from "@mui/material";

function TextFieldInputComp(props) {
  return (
    <Box
      display={"flex"}
      justifyItems={"center"}
      flexDirection={"column"}
      mb={"17px"}
    >
      <TextField
        size="small"
        label={props.label}
        variant="outlined"
        InputLabelProps={{ style: { color: "#49C4BC" } }}
        required
        sx={{
          width: "240px",
          borderRadius: "0.29rem",
          color: "#49C4BC",
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "#49C4BC",
            },
          },
        }}
      />
    </Box>
  );
}

export default TextFieldInputComp;
