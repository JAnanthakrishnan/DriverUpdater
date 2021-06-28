import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">
        Fetching the Latest and Current Versions
      </Typography>
      <LinearProgress color="secondary" />
    </div>
  );
}
