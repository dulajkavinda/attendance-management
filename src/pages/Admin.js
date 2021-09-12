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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 50
  },
  media: {
    height: 130,
  },
});

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
        setAttendance(cleaned);
        console.log(attendance);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getStudent = (id) => {
    axios
      .post("http://localhost:5000/student/findOne", { id })
      .then((res) => {
        return res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="main_admin">
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
  );
}
