import { Grid, Button, Container } from "@mui/material";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../provider/authProvider";

export default function FeedbackStudent() {
  const { idActivitate } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { token } = useAuth();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleSubmitFeedback = async (emoji) => {
    await axios
      .post(
        `http://localhost:8080/api/feedback/${idActivitate}`,
        { descriere: emoji },
        config
      )
      .then((res) => {
        handleCreateFeedbackNotification("success", emoji);
      })
      .catch((err) => {
        console.log(err.message);
        handleCreateFeedbackNotification("error", emoji);
      });
  };
  const handleCreateFeedbackNotification = (variant, emoji) => {
    if (variant == "success") {
      enqueueSnackbar(`${emoji} Feedback send successfully!`, { variant });
    } else if (variant == "error") {
      enqueueSnackbar(`${emoji} Failed to send feedback!`, { variant });
    }
  };
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
              onClick={() => handleSubmitFeedback("😊")}
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
              onClick={() => handleSubmitFeedback("🙁")}
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
              onClick={() => handleSubmitFeedback("😮")}
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
              onClick={() => handleSubmitFeedback("😵")}
            >
              😵
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
