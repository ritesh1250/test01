import http from "./httpServices";
import jwtDecode from "jwt-decode";
import apiUrl from "../config.json";
// import {  notification } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const openNotificationWithIcon = (type,desc) => {
//     notification[type]({
//       message: 'meest cmp',
//       description:desc,
//     });
//   };

const apiEndPoint = apiUrl.apiEnd + "/login";
export async function login(username, password) {
  await http
    .post(apiEndPoint, { username, password })
    .then((res) => {
      toast.success("Logged In", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      localStorage.setItem("token", res.data);
      // this.props.history.push("/")
      window.location.href = "/";
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      localStorage.setItem("status", err?.response?.status);
      localStorage.setItem("userid", err?.response?.data?.userId);
      localStorage.setItem("sessionid", err?.response?.data?.sessionid);
      toast.error(err?.response?.data?.error, {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      //alert(err.response.data.error)
    });
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export default {
  login,
  getCurrentUser,
};
