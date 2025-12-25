import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: backendUrl
});
