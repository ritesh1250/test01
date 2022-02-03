import React from 'react'
import {
  CWidgetIcon,
  CRow,
  CCol,
  CWidgetProgress
} from '@coreui/react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { Component } from 'react'
import auth from "../prashant/services/authServices"
import http from "../prashant/services/httpServices"
import apiUrl from "../prashant/config.json";
import element2 from "../prashant/Element.css"

class WidgetsDropdown extends Component {
  state = {
    user: {},
    summaryData: [],
    totalPost: "",
    totalApprove: "",
    totalReject: "",
    totalHold: ""
  }
  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
    const data4 = await http.get(apiUrl.apiEnd + "/modDashboard", { headers: { "Authorization": `Bearer ${tokenStr}` } })


    this.setState({ user: user1, totalPost: data4.data.result[0][0].totalPost, totalApprove: data4.data.result[1][0].approvedPost, totalReject: data4.data.result[2][0].declinedPost, totalHold: data4.data.result[3][0].holdPost })
  }
  render() {
    const { totalApprove, totalPost, totalReject, totalHold } = this.state

    return (
      <CRow>
        <CCol xs="12" sm="6" lg="3">
          <CCol className="element2" style={{ textAlign: "center", backgroundColor: "blue", height: 80, borderRadius: 10, paddingTop: 19 }}>
            <h5 className="text-white">Total Post</h5>
            <h6 className="text-white">{this.state.totalPost}</h6>
          </CCol>
          {/* <CWidgetIcon text="" header={this.state.totalPost} color="primary" iconPadding={false}>
           Total Post
          </CWidgetIcon> */}
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CCol className="element2" style={{ textAlign: "center", backgroundColor: "green", height: 80, borderRadius: 10, paddingTop: 19 }}>
            <h5 className="text-white">Total Approve</h5>
            <h6 className="text-white">{this.state.totalApprove}</h6>
          </CCol>
          {/* <CWidgetIcon text="" header={this.state.totalApprove} color="success" iconPadding={false}>
           Total Approve
          </CWidgetIcon> */}
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CCol className="element2" style={{ textAlign: "center", backgroundColor: "red", height: 80, borderRadius: 10, paddingTop: 19 }}>
            <h5 className="text-white">Total Reject</h5>
            <h6 className="text-white">{this.state.totalReject}</h6>
          </CCol>
          {/* <CWidgetIcon text="" header={this.state.totalReject} color="danger" iconPadding={false}>
           Total Reject
          </CWidgetIcon> */}
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CCol className="element2" style={{ textAlign: "center", backgroundColor: "grey", height: 80, borderRadius: 10, paddingTop: 19 }}>
            <h5 className="text-white">Total Hold</h5>
            <h6 className="text-white">{this.state.totalHold}</h6>
          </CCol>
          {/* <CWidgetIcon text="" header={this.state.totalHold} color="warning" iconPadding={false}>
           Total Hold
          </CWidgetIcon> */}

        </CCol>
        {/* <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="success" variant="inverse" header="89.9%" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="info" variant="inverse" header="12.124" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="warning" variant="inverse" header="$98.111,00" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <CWidgetProgress inverse color="danger" variant="inverse" value={95} header="2 TB" text="Lorem ipsum..." footer="Lorem ipsum dolor sit amet enim."/>
        </CCol> */}

      </CRow>
    );
  }
}

export default WidgetsDropdown
