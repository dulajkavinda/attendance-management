import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

export default function Student(props) {
  const deleteStudent = (id) => {
    const deleteStudentNow = async () => {
      await axios
        .post("http://localhost:5000/student/deleteStudent", { id: id })
        .then((response) => {
          console.log(response.data);
        });
    };
    deleteStudentNow();
  };

  const classes = useStyles();
  const classes_nav = useStylesNav();

  return (
    <div className="main_students">
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
          <Button color="inherit">All Students</Button>
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
      <TableContainer style={{ width: "50%", marginTop:"100px" }} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Class</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.students.map((student) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell align="right">{student.name}</TableCell>
                  <TableCell align="right">{student.class}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => deleteStudent(student.id)}
                      size="small"
                      color="primary"
                    >
                      DELETE
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
