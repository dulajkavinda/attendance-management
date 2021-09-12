import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
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

  return (
    <div className="main_add">
      <h2>add new student</h2>
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
        <input onChange={(e) => {setfiles(e.target.files[0])}} multiple type="file" />
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
