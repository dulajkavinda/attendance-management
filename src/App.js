import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import axios from "axios";

import Attendance from "./pages/Attendance";
import Admin from "./pages/Admin";
import AddStudent from "./pages/AddStudent";
import Records from './pages/Records'

export default function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    setStudents(students);
  }, [students]);

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get("http://localhost:5000/student/all");
      setStudents(request.data.result);
    };
    fetchData();
  }, [setStudents]);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            {students.length > 0 ? <Attendance students={students} />: null} 
          </Route>
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Route exact path="/add">
            <AddStudent />
          </Route>
          <Route exact path="/records">
            <Records />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
