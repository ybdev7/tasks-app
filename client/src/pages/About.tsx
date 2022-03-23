import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import ScrollToTop from "../components/buttons/ScrollToTop";

import { FC, ReactElement } from "react";
const About: FC<{}> = (): ReactElement => {
  return (
    <>
      <Container>
        <ScrollToTop />

        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="flex-start"
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          m={10}
        >
          <Grid item xs={4} md={12} marginTop={10}>
            <Typography variant="h6" component="div" gutterBottom>
              About Us
            </Typography>
          </Grid>
          <Grid item xs={4} md={12}>
            About...
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default About;
