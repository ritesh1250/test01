import React from 'react';
import "../prashant/Element.css";
import auth from "../prashant/services/authServices"
import axios from "axios"
import apiUrl from "../prashant/config.json";

import MeestChart from "./MeestChart";
//import auth from '../prashant/services/authServices';
import {
  CCardBody,
  CRow,
  CCol,

} from '@coreui/react'
import {
  // CChartBar,
  CChartLine,
  // CChartDoughnut,
  // CChartPie,
} from '@coreui/react-chartjs'
import { Component } from 'react';
// import { DocsLink } from 'src/reusable'


class SimpleChart extends Component {
  //const user1=auth.getCurrentUser();
  state = {
    user: {},
    summaryData: [],
    dateTime: [],
    modDashboard: []
  }
  
  render() {
    const { summaryData, dateTime, user } = this.state
    return (
    <>
      <MeestChart />
    </>
    );
  }
}

export default SimpleChart
