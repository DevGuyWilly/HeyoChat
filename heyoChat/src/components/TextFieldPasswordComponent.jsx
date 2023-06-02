import React from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

function TextFieldPasswordComponent(props) {
  const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfrimPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box
      display={"flex"}
      justifyItems={"center"}
      flexDirection={"column"}
      mb={"17px"}
    >
      <TextField
        InputLabelProps={{ style: { color: "#49C4BC" } }}
        type={showPassword ? "text" : "password"}
        size="small"
        label={props.label}
        variant="outlined"
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((show) => !show)}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default TextFieldPasswordComponent;
