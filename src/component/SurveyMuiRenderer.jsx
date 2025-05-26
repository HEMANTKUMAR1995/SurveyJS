import React, { useEffect, useState } from "react";
import { TextField, Box, Typography, Grid, Paper, Button } from "@mui/material";

const dbMappingLabels = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email"
};

const renderElement = (el) => (
  <Grid
    item
    xs={el.startWithNewLine === false ? 6 : 12}
    key={el.name}
    sx={{ minWidth: 200, flexGrow: el.startWithNewLine === false ? 1 : 1 }}
  >
    <Paper >
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        {el.title || el.name}
        {/* {dbMappingLabels[el.dbMapping] || el.title || el.name} */}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        name={el.name}
        InputProps={{ sx: { backgroundColor: "#fafafa" } }}
      />
    </Paper>
  </Grid>
);

const SurveyMuiRenderer = () => {
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/survey")
      .then(res => res.json())
      .then(data => setSurvey(data));
  }, []);

  if (!survey) return <div>Loading survey...</div>;

  // Group elements into rows based on startWithNewLine
  const rows = [];
  let currentRow = [];
  survey.pages[0].elements.forEach((el) => {
    if (el.startWithNewLine === false && currentRow.length > 0) {
      currentRow.push(el);
    } else {
      if (currentRow.length > 0) rows.push([...currentRow]);
      currentRow = [el];
    }
  });
  if (currentRow.length > 0) rows.push(currentRow);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, bgcolor: "#f7f7f7", minHeight: "100vh", p: 3 }}>
      <Typography variant="h3" sx={{ color: "#16b39b", mb: 2, fontWeight: 700 }}>
        {survey.title}
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600,color:"black" }}>
        {survey.pages[0].title}
      </Typography>
      <form>
        {rows.map((row, i) => (
          <Grid container spacing={3} key={i} sx={{ mb: 2 }}>
            {row.map(renderElement)}
          </Grid>
        ))}
        {/* <Button
          variant="contained"
          color="teal"
          size="large"
          sx={{ mt: 4, px: 5, backgroundColor: "#16b39b", "&:hover": { backgroundColor: "#139e89" } }}
        >
          Complete
        </Button> */}
      </form>
    </Box>
  );
};

export default SurveyMuiRenderer;