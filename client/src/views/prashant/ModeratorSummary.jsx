import React, { Component, lazy } from 'react';
import SimpleChart2 from "../charts/SimpleChart2";
import http from "./services/httpServices";
import apiUrl from "./config.json";
import auth from "./services/authServices"
import axios from "axios"
const SimpleWidgets = lazy(() => import('../widgets/SimpleWidgets.js'))


class ModeratorSummary extends Component {
  state = {
    user: {},
    summaryData: [],
    dateTime: [],
    modDashboard: []
  }
  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const response = await http.post(apiUrl.apiEnd + "/verifyToken", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    // console.log(response.status)
    if (response.data.code === '500') {
      const user = auth.getCurrentUser();
      alert("Your session has expire.So please login again")
      await axios.post(apiUrl.apiEnd + "/logout", { userid: user.id, sessionid: user.sessionid })
      localStorage.removeItem("token")
      // this.props.history.push("/login")
      this.props.history.push("/dashboard")

    }
    else {
      //console.log(response)
    }
    // console.log(response.status)
  }

  
  render() {
    return (
      <>

        <SimpleWidgets />
        <SimpleChart2 />
      </>
    )
  }
}

export default ModeratorSummary
