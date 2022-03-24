import { Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { FC, ReactElement } from "react";
import ScrollToTop from "../components/buttons/ScrollToTop";
import SettingsUI from "../components/SettingsUI";
const Settings: FC<{}> = (): ReactElement => {
  return (
    <>
      <Container>
        <ScrollToTop />

        <Grid
          container
          direction="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          m={2}
          marginTop={10}
        >
          <Grid item xs={4} md={12} marginTop={10}>
            <Typography variant="h6" component="div" gutterBottom>
              Settings
            </Typography>
          </Grid>
        </Grid>
        <SettingsUI />
      </Container>
    </>
  );
};

export default Settings;
