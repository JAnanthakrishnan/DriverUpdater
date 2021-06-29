import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import LinearIndeterminate from "./Loading.js";
import { green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200,
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
  },
  textField: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1),
    minWidth: 120,
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  // buttonSuccess: {
  //   backgroundColor: green[500],
  //   "&:hover": {
  //     backgroundColor: green[700],
  //   },
  // },
}));

export default function FormPage({ ip, username, password, node }) {
  const classes = useStyles();
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [errorOpen, setErrorOpen] = React.useState(false);
  const [grid, setGrid] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [Browser, setBrowser] = React.useState("");
  const [versions, setVersion] = React.useState({});
  const [curVersion, setCurrent] = React.useState("Choose config");
  const [latest, setLatest] = React.useState({});
  const [success, setSuccess] = React.useState(false);
  const [latestVersion, setLatestVersionNumber] =
    React.useState("Chose Browser");
  const [load, setPageLoading] = React.useState(true);
  const timer = React.useRef();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
    setErrorOpen(false);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  useEffect(() => {
    console.log(password);
    async function fetchData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = {
        node,
      };
      try {
        const res = await axios.post("/api/fetchcurrent", formData, config);
        const latest = await axios.get("/api/fetchlatest");
        if (res) setPageLoading(false);
        // console.log(res.data);
        setLatest(latest.data);
        setVersion(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

    // console.log("Hello");
    // eslint-disable-next-line
  }, []);

  const handleGrid = (event) => {
    setGrid(event.target.value);
    let ourGrid = ["Grid1", "Grid2"];
    if (Browser === 1) {
      setCurrent(versions[ourGrid[event.target.value - 1]].chromeVersion);
    }
    if (Browser === 2) {
      setCurrent(versions[ourGrid[event.target.value - 1]].geckoDriver);
    }
    if (Browser === 3) {
      setCurrent(versions[ourGrid[event.target.value - 1]].edgeVersion);
    }
  };
  const handleBrowser = (event) => {
    let ourGrid = ["Grid1", "Grid2"];
    console.log(versions);
    setBrowser(event.target.value);
    if (event.target.value === 1) {
      if (grid !== "") {
        console.log(versions);
        setCurrent(versions[ourGrid[grid - 1]].chromeVersion);
      }
      setLatestVersionNumber(latest.chromeStabledriver);
    }
    if (event.target.value === 2) {
      if (grid !== "") {
        console.log(versions);
        setCurrent(versions[ourGrid[grid - 1]].geckoDriver);
      }
      setLatestVersionNumber(latest.geckodriver);
    }
    if (event.target.value === 3) {
      if (grid !== "") {
        console.log(versions);
        setCurrent(versions[ourGrid[grid - 1]].edgeVersion);
      }
      setLatestVersionNumber(latest.edgedriver);
    }
  };
  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      if (Browser === "" || grid === "") {
        setErrorOpen(true);
        setSuccess(true);
        setLoading(false);
      }
      if (grid !== "" && Browser !== "") {
        console.log(grid);
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        console.log(Browser);
        let gridData = ["Grid1", "Grid2"];
        const formData = {
          grid: gridData[grid - 1],
          node,
          ip,
          username,
          password,
        };
        console.log(formData);
        if (Browser === 1)
          await axios.post("/api/update/chrome", formData, config);
        if (Browser === 2)
          await axios.post("/api/update/gecko", formData, config);
        if (Browser === 3)
          await axios.post("/api/update/edge", formData, config);

        // setSuccessOpen(true);
        // setSuccess(true);
        // setLoading(false);
        // timer.current = window.setTimeout(() => {
        //   window.location.reload();
        // }, 200);

        const upData = {
          node,
        };
        let res;
        timer.current = window.setTimeout(async () => {
          res = await axios.post("/api/fetchcurrent", upData, config);
          setVersion(res.data);
          setSuccessOpen(true);
          setSuccess(true);
          setLoading(false);
          setBrowser("");
          setCurrent("Choose Config");
        }, 1000);
      }
    }
  };

  if (load) {
    return (
      <div>
        <LinearIndeterminate />
      </div>
    );
  }
  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Grid</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grid}
          onChange={handleGrid}
        >
          <MenuItem value={1}>Grid 1</MenuItem>
          <MenuItem value={2}>Grid 2</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Browser</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Browser}
          onChange={handleBrowser}
        >
          <MenuItem value={1}>Chrome</MenuItem>
          <MenuItem value={2}>Mozilla</MenuItem>
          <MenuItem value={3}>Edge</MenuItem>
        </Select>
      </FormControl>
      <br></br>
      <div className={classes.textField}>
        <FormControl className={classes.formControl}>
          <TextField
            disabled
            id="standard-disabled"
            label="Current Version"
            value={curVersion}
            size="medium"
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <TextField
            disabled
            id="standard-disabled"
            label="Latest Driver Version"
            value={latestVersion}
            size="medium"
          />
        </FormControl>
      </div>
      <FormControl className={classes.formControl}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={handleButtonClick}
          >
            Update
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </FormControl>
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Chose Both Grid and Browser!
        </Alert>
      </Snackbar>
    </div>
  );
}
