import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Button} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
        display: 'flex',
        flexDirection : 'column',
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth :200 ,
    },
    textField: {
        display: 'flex',
        flexDirection : 'row',
        margin: theme.spacing(1),
        minWidth: 120,
    },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function FormPage() {
  const classes = useStyles();
  const [grid, setGrid] = React.useState('');
  const [Browser, setBrowser] = React.useState('');
  const handleGrid = (event) => {
    setGrid(event.target.value);
  };
  const handleBrowser = (event) => {
    setBrowser(event.target.value);
  };

  return (
    <div>
        <FormControl className={classes.formControl} >
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
        <FormControl  className={classes.formControl}>
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
        <TextField disabled id="standard-disabled" label="Exisiting Version" defaultValue="91.0.0.0" />
        </FormControl>
        <FormControl className={classes.formControl}>
        <TextField disabled id="standard-disabled" label="Latest Version" defaultValue="91.0.0.0" />
        </FormControl>
      </div>
      <FormControl className={classes.formControl}>
      <Button variant="contained" color="secondary">
        Update
        </Button>
        </FormControl>
    </div>
  );
}
