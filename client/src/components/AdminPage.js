import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import axios from "axios";
import { green } from "@material-ui/core/colors";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 200,
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
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

export default function AdminPage() {
  const password = "Password";
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [authorized, setAuthorized] = React.useState(false);
  const [node1ip, setnode1ip] = React.useState("");
  const [node1un, setnode1un] = React.useState("");
  const [node1pw, setnode1pw] = React.useState("");
  const [node2ip, setnode2ip] = React.useState("");
  const [node2un, setnode2un] = React.useState("");
  const [node2pw, setnode2pw] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/fetchmachine");
      setnode1ip(res.data.node1.ip);
      setnode1pw(res.data.node1.password);
      setnode1un(res.data.node1.username);
      setnode2ip(res.data.node2.ip);
      setnode2pw(res.data.node2.password);
      setnode2un(res.data.node2.username);
    }
    if (authorized) fetchData();
  }, [authorized]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (password !== input) {
      console.log("Not authorized");
    }
    if (password === input) {
      setOpen(false);
      setAuthorized(true);
    }
  };

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessOpen(false);
  };

  const handleButtonClick = async () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = {
        node1: {
          ip: node1ip,
          username: node1un,
          password: node1pw,
        },
        node2: {
          ip: node2ip,
          username: node2un,
          password: node2pw,
        },
      };
      console.log(formData);
      await axios.post("/api/fetchmachine", formData, config);
      timer.current = window.setTimeout(async () => {
        setSuccessOpen(true);
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div>
      {!authorized && (
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Get Admin Access
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Admin Access</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your Password</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="pwd"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Get Access
          </Button>
        </DialogActions>
      </Dialog>
      {authorized && (
        <form className={classes.root} noValidate autoComplete="off">
          <Typography variant="h6">Node 1 </Typography>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="IP Address"
              size="medium"
              value={node1ip}
              onChange={(e) => {
                setnode1ip(e.target.value);
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="Username"
              size="medium"
              value={node1un}
              onChange={(e) => {
                setnode1un(e.target.value);
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="Password"
              size="medium"
              value={node1pw}
              onChange={(e) => {
                setnode1pw(e.target.value);
              }}
            />
          </FormControl>
          <Typography variant="h6">Node 2 </Typography>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="IP Address"
              size="medium"
              value={node2ip}
              onChange={(e) => {
                setnode2ip(e.target.value);
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="Username"
              size="medium"
              value={node2un}
              onChange={(e) => {
                setnode2un(e.target.value);
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              id="standard-basic"
              label="Password"
              size="medium"
              value={node2pw}
              onChange={(e) => {
                setnode2pw(e.target.value);
              }}
            />
          </FormControl>
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
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </FormControl>
          <Snackbar
            open={successOpen}
            autoHideDuration={4000}
            onClose={handleAlertClose}
          >
            <Alert onClose={handleAlertClose} severity="success">
              Updated Successfully
            </Alert>
          </Snackbar>
        </form>
      )}
    </div>
  );
}
