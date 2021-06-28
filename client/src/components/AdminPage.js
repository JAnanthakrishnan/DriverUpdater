import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

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
}));

export default function AdminPage() {
  const password = "Password";
  const classes = useStyles();
  const [input, setInput] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [authorized, setAuthorized] = React.useState(false);

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
              disabled
              id="standard-basic"
              label="IP Address"
              size="medium"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              disabled
              id="standard-basic"
              label="Password"
              size="medium"
            />
          </FormControl>
          <Typography variant="h6">Node 2 </Typography>
          <FormControl className={classes.formControl}>
            <TextField
              disabled
              id="standard-basic"
              label="IP Address"
              size="medium"
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              disabled
              id="standard-basic"
              label="Password"
              value="thisisAdmin"
              size="medium"
            />
          </FormControl>
        </form>
      )}
    </div>
  );
}
