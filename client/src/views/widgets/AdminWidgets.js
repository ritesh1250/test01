import React from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CWidgetIcon,

} from '@coreui/react'
import { Component } from 'react'
import auth from "../prashant/services/authServices"
import http from "../prashant/services/httpServices"
import apiUrl from "../prashant/config.json";

class WidgetsDropdown extends Component {
  state = {
    user: {},
    summaryData: [],
    totalPost: "",
    totalApprove: "",
    totalReject: "",
    totalHold: "",
    medlyPost: "",
    medlyHold: "",
    medlyReject: "",
    medlyApprove: ""
  }
  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
    const data1 = await http.get(apiUrl.apiEnd + "/getadminmeestdashdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const data2 = await http.get(apiUrl.apiEnd + "/getadminmedleydashdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })

    this.setState({
      user: user1, totalPost: data1.data.meest[0][0].totalPost, totalApprove: data1.data.meest[1][0].approvedPost,
      totalReject: data1.data.meest[2][0].declinedPost, totalHold: data1.data.meest[3][0].holdPost, medlyApprove: data2.data.medly[1][0].approvedPost, medlyHold: data2.data.medly[3][0].holdPost, medlyPost: data2.data.medly[0][0].totalPost, medlyReject: data2.data.medly[2][0].declinedPost
    })
  }
  render() {
    const { totalApprove, totalPost, totalReject, totalHold } = this.state

    return (
      <>
        <CRow>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.totalPost} color="primary" iconPadding={false}>
              Meest Total Post
          </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.totalApprove} color="success" iconPadding={false}>
              Meest Total Approve
          </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.totalReject} color="danger" iconPadding={false}>
              Meest Total Reject
          </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.totalHold} color="warning" iconPadding={false}>
              Meest Total Hold
          </CWidgetIcon>

          </CCol>
        </CRow>
        <CRow>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.medlyPost} color="primary" iconPadding={false}>
              Medley Total Post
         </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.medlyApprove} color="success" iconPadding={false}>
              Medley Total Approve
         </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.medlyReject} color="danger" iconPadding={false}>
              Medley Total Reject
         </CWidgetIcon>
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <CWidgetIcon text="In last hour" header={this.state.medlyHold} color="warning" iconPadding={false}>
              Medley Total Hold
         </CWidgetIcon>

          </CCol>
        </CRow>
      </>
    );
  }
}

export default WidgetsDropdown
