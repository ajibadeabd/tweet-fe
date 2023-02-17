import axios from "axios";
const token = localStorage.getItem("token");
export default axios.create({
  baseURL: "https://assessment-production-398f.up.railway.app/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
