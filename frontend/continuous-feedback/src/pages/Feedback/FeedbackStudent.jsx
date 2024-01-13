import { Grid, Button, Container } from "@mui/material";

export default function FeedbackStudent() {
  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <h1>Reactii:</h1>
        <Grid
          style={{ height: "50vh" }}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 2 }}
        >
          <Grid item xs={6}>
            <Button
              style={{ height: "100%", fontSize: "-webkit-xxx-large" }}
              size="large"
              fullWidth="true"
              variant="contained"
            >
              😊
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ height: "100%", fontSize: "-webkit-xxx-large" }}
              size="large"
              fullWidth="true"
              variant="contained"
            >
              🙁
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ height: "100%", fontSize: "-webkit-xxx-large" }}
              size="large"
              fullWidth="true"
              variant="contained"
            >
              😮
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              style={{ height: "100%", fontSize: "-webkit-xxx-large" }}
              size="large"
              fullWidth="true"
              variant="contained"
            >
              😵
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
