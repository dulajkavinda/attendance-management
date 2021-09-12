import React, { useState, useEffect } from "react";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 245,
    marginTop: 50,
  },
  media: {
    height: 130,
  },
});

const useStylesNav = makeStyles((theme) => ({
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

const columns = [
  { field: "id", headerName: "ID", width: 120 },
  {
    field: "time",
    headerName: "Time",
    width: 200,
    editable: true,
  },
];

export default function Admin() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/attendance/all")
      .then((res) => {
        let cleaned = [];
        res.data.result.map((attendance) => {
          cleaned.push({
            id: attendance.id,
            time: new Date(attendance.time).toLocaleString(),
          });
        });
        let current_date = new Date().toDateString();
        const filtered = cleaned.filter((attendance) => {
          let date = new Date(attendance.time).toDateString();
          console.log(current_date, date);
          return date === current_date;
        });

        setAttendance(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const classes = useStyles();
  const classes_nav = useStylesNav();

  return (
    <div className="main_admin">
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
      <div className="body_admin">
        <div style={{ height: 500, width: "20%" }}>
          <h3>Today</h3>
          <DataGrid rows={attendance} columns={columns} pageSize={7} />
        </div>

        <div className="side">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./addnew.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Add New Student
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                ADD
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>

          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./cal.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Past Records
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                View
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    </div>
  );
}
