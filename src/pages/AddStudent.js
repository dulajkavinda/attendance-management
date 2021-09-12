import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AddStudent() {
  const [id, setid] = useState("");
  const [name, setname] = useState("");
  const [classes, setclass] = useState("");
  const [files, setfiles] = useState(null);

  const submit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("class", classes);
    formData.append("id", id);
    formData.append("studentImage", files);

    axios
      .post("http://localhost:5000/student/registerStudent", formData, {})
      .then((response) => {
        console.log(response.data);
      });
  };

  const classes_nav = useStyles();

  return (
    <div className="main_add">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes_nav.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes_nav.title}>
            Attendance Management System
          </Typography>
          <Link to="/admin" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Add Student</Button>
          </Link>
          <Link
            to="/students"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">All Students</Button>
          </Link>
          <Link
            to="/records"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">View Past Records</Button>
          </Link>
          <Link to="/info" style={{ textDecoration: "none", color: "white" }}>
            <Button color="inherit">Info</Button>
          </Link>
          <Link
            to="/support"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Contact Support</Button>
          </Link>
          <Link
            to="/provacy"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Button color="inherit">Privacy</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <h2 style={{ marginTop: "100px" }}>add new student</h2>
      <div className="form">
        <TextField
          onChange={(e) => setid(e.target.value)}
          id="outlined-basic"
          label="ID Number"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setname(e.target.value)}
          id="outlined-basic"
          label="Name"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setclass(e.target.value)}
          id="outlined-basic"
          label="Class"
          variant="outlined"
        />
        <input
          onChange={(e) => {
            setfiles(e.target.files[0]);
          }}
          multiple
          type="file"
        />
        <Button
          onClick={submit}
          style={{ width: "10%", marginTop: "10px" }}
          variant="contained"
          color="secondary"
        >
          Add New Student
        </Button>
      </div>
    </div>
  );
}
