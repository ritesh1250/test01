import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import http from "../prashant/services/httpServices";
import apiUrl from "../prashant/config.json";
import element3 from "../prashant/Element.css";
import axios from "axios"


class PrashantChart extends Component {

  state = {
    options: {

    },
    series: [

    ]
    ,
    options1: {

    },
    series1: [

    ]
  }
  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const data = {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: []
      },
      colors: ["#41B883", "#E46651", '#FB8833']
    };
    const sts = [
      {
        name: 'Total approve',
        data: []
      },
      {
        name: 'Total Reject',
        data: []
      },
      {
        name: 'Total Hold',
        data: []
      }
    ]
    const data2 = {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: []
      },
      colors: ["#41B883", "#E46651", '#FB8833']
    };
    const sts1 = [
      {
        name: 'Total approve',
        data: []
      },
      {
        name: 'Total Reject',
        data: []
      },
      {
        name: 'Total Hold',
        data: []
      }
    ]

    const data1 = await http.get(apiUrl.apiEnd + "/modsummary", { headers: { "Authorization": `Bearer ${tokenStr}` } })
  
    console.log(data1);
    sts[0].data = data1.data[0].dailyDataresult.map(n1 => n1.Approved)
    sts[2].data = data1.data[0].dailyDataresult.map(n1 => n1.Hold)
    sts[1].data = data1.data[0].dailyDataresult.map(n1 => n1.Rejected)

    data.xaxis.categories = data1.data[0].dailyDataresult.map(n1 => new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(n1.Date)))
    this.setState({ series: sts, options: data })
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    sts1[0].data = data1.data[0].monthlyDataresult.map(n1 => n1.Approved)
    sts1[1].data = data1.data[0].monthlyDataresult.map(n1 => n1.Rejected)
    sts1[2].data = data1.data[0].monthlyDataresult.map(n1 => n1.Holded)
    data2.xaxis.categories = data1.data[0].monthlyDataresult.map(n1 => month[ n1.month === 0 ? 0:n1.month-1])
    this.setState({ series1: sts1, options1: data2 })

  }
  render() {
    return (
      <div className="row mt-5">
        {this.state.options !== null ?
          <>
            <div className="col-md-12 ">
              <h4>Summary Data</h4>
              <hr />
            </div>

            <div className="section col-md-6 element3">
              <h5 className="section-title">Daily Report</h5>
              <div className="section-content">
                <Chart options={this.state.options} series={this.state.series} type="area" />
              </div>
            </div>

            <div className="section col-md-6 element3">
              <h5 className="section-title">Monthly Report</h5>
              <div className="section-content">
                <Chart options={this.state.options1} series={this.state.series1} type="bar" />
              </div>
            </div></> : ""}
      </div>
    )
  }
}
export default PrashantChart;