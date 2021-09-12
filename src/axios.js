import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/student/all"
})

export default instance