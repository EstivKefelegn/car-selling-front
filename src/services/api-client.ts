import axios from "axios"

export default axios.create({
    // baseURL: "http://localhost:8000"
    // baseURL: "http://10.220.234.55:8000"
    baseURL: "http://192.168.1.5:8000"
})