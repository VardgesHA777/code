import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress size="20px" color="inherit"/>
    </Box>
  );
};

export default Loader;
