import React, { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import "../App.css";
import Webcam from "react-webcam";

import users from "../api/students.json";

import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Attendance(props) {
  const [selectedFile, setSelectedFile] = useState();
  const [screenImage, setScreenImage] = useState("");
  const [inStudent, setInStudent] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  useEffect(() => {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(start);
    console.log(props.students);
  }, []);

  useEffect(() => {
    setInStudent(inStudent);
  }, [inStudent]);

  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setScreenImage(imageSrc);
    processImage(imageSrc);
  }, [webcamRef]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  async function start() {}

  const processImage = async (imageSrc) => {
    setLoading(true);
    const container = document.createElement("div");
    container.className = "canvas_wrapper";
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    let image;
    let canvas;
    // document.body.append('Loaded')
    if (image) image.remove();
    if (canvas) canvas.remove();
    const blob = dataURLtoBlob(imageSrc);
    image = await faceapi.bufferToImage(blob);
    container.append(image);
    canvas = faceapi.createCanvasFromMedia(image);
    container.append(canvas);
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);
    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) =>
      faceMatcher.findBestMatch(d.descriptor)
    );
    results.forEach((result, i) => {
      console.log(result.label);
      if (result.label !== "unknown") {
        let student = props.students.filter((user) => user.name === result.label);
        let id = student[0].id;
        let time = new Date().toLocaleString();
        const timein = {
          id,
          time,
        };
        saveTime(timein);
        setInStudent(student);
        setNotFound(false);
        setLoading(false);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    });
  };

  const saveTime = (saveTime) => {
    axios
      .post("http://localhost:5000/attendance/record", saveTime)
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  };

  function loadLabeledImages() {
    const labels = [];
    props.students.map((student) => {
      labels.push(student.name);
    });

    return Promise.all(
      labels.map(async (label) => {
        const descriptions = [];

        const img = await faceapi.fetchImage(
          `http://localhost:5000/${label}/1.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        descriptions.push(detections.descriptor);

        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
  }

  const dataURLtoBlob = (dataurl) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };
  const classes = useStyles();
  return (
    <div className="main">
      <h1> attendance management system </h1>
      <div className="container" id="container">
        <div className="video_feed">
          <Webcam
            audio={false}
            height={500}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={500}
            videoConstraints={videoConstraints}
          />
          <Button
            onClick={capture}
            style={{ width: "100%", marginTop: "10px" }}
            variant="contained"
            color="secondary"
          >
            IN
          </Button>
        </div>

        <div className="result" id="result">
          {loading ?? <p>loading</p>}
          {notFound && (
            <div>
              <h1>please try again</h1>
              <ul>
                <li>directly look at the camera</li>
                <li>make sure there is enough light</li>
                <li>make sure you have valid permissions</li>
              </ul>
            </div>
          )}
          <div id="profile_image">
            {inStudent !== null && inStudent.length > 0 ? (
              <img
                width="100px"
                height="100px"
                src={`http://localhost:5000/${inStudent[0].name}/1.jpg`}
              />
            ) : null}
          </div>
          <div className="details">
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                {inStudent !== null && inStudent.length > 0 ? (
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Student Name
                      </TableCell>
                      <TableCell align="right">{inStudent[0].name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Student ID
                      </TableCell>
                      <TableCell align="right">{inStudent[0].id}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        IN Time
                      </TableCell>
                      <TableCell align="right">
                        {new Date().toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : null}
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
