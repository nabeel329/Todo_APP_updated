import React from "react";
import { Container, Button } from "@mui/material";

const Home = () => (
  <Container style={{ marginTop: "20px", textAlign: "center" }}>
    <h1>Welcome to the TODO App</h1>
    <Button variant="contained" color="primary" href="/todo">
      Go to TODO App
    </Button>
  </Container>
);

export default Home;
