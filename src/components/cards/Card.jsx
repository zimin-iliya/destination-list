import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Container from "@mui/material/Container";
import { Grid } from "@mui/material";

export default function Card({ text, onClick }) {
  return (
    <>
      <Box
        sx={{
          marginTop: "10px",
          width: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "darkgray",
          borderRadius: "10px",
          mx: 2,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <h1>map</h1>
          </Grid>
            <Grid item xs={12} sm={6} md={6}>
          <Fab size="small" color="error" aria-label="add">
            <DeleteForeverIcon />
          </Fab>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
