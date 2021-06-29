import React, { useEffect } from "react";
import FormPage from "./FormPage";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AdminPage from "./AdminPage";
import axios from "axios";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: "100vh",
    marginBottom: "20px",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs({ index = 0 }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(index);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("/api/fetchmachine");
      if (res) {
        setData(res.data);
        setLoading(false);
      }
      console.log(res.data);
    }
    console.log("index:", index);
    fetchData();
    // eslint-disable-next-line
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("tabIndex", newValue);
  };

  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="Node One" {...a11yProps(0)} style={{ margin: "20px" }} />
        <Tab label="Node Two" {...a11yProps(1)} style={{ margin: "20px" }} />
        <Tab label="Admin " {...a11yProps(0)} style={{ margin: "20px" }} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <FormPage
          ip={data.node1.ip}
          username={data.node1.username}
          password={data.node1.password}
          node={"Node1"}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FormPage
          ip={data.node2.ip}
          username={data.node2.username}
          password={data.node2.password}
          node={"Node2"}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <AdminPage />
      </TabPanel>
    </div>
  );
}
