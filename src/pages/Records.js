import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";

import { Link } from "react-router-dom";

import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";

import { DataGrid } from "@material-ui/data-grid";

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

export default function Records() {
  var d = new Date();

  var date = d.getDate();
  var month = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
  var year = d.getFullYear();
  const defaultValue = {
    year: year,
    month: month,
    day: date,
  };

  const [selectedDay, setSelectedDay] = useState(defaultValue);
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
        let current_date = new Date(
          selectedDay.year,
          selectedDay.month - 1,
          selectedDay.day
        ).toDateString();
        console.log(current_date);
        const filtered = cleaned.filter((attendance) => {
          let date = new Date(attendance.time).toDateString();
          return date === current_date;
        });

        console.log(filtered);

        setAttendance(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedDay]);

  const classes_nav = useStylesNav();
  return (
    <div className="main_records">
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
      <div className="body_records">
        <Calendar
          value={selectedDay}
          onChange={setSelectedDay}
          shouldHighlightWeekends
        />
        <div style={{ height: 500, width: "20%" }}>
          <h3>
            {new Date(
              selectedDay.year,
              selectedDay.month - 1,
              selectedDay.day
            ).toDateString()}
          </h3>
          <DataGrid rows={attendance} columns={columns} pageSize={7} />
        </div>
      </div>
    </div>
  );
}
