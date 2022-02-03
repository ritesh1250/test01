import React, { Component, lazy } from 'react'
import {

  CCol,
  // CProgress,
  CRow,
  // CCallout
} from '@coreui/react'
// import CIcon from '@coreui/icons-react'
import axios  from "axios";
// import auth from "./services/authServices";
import apiUrl from "../prashant/config.json";
import PrashantChart from '../prashant/PrashantChart'
import StackChart from '../prashant/StackChart'
import Daughhut from '../prashant/Daughhut'

const AdminWidgets = lazy(() => import('../widgets/AdminWidgets.js'))
// const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

class Dashboard extends Component {
  state={
      approve1:"",
      hold:"",
      reject:"",
      total:"",
      date:""
  }
 
  render(){
  return (
    <>
      <AdminWidgets />
        {/* <CCardBody> */}
      
      
         
          <CCol>
          <PrashantChart />
          </CCol>
          <CCol className="mt-5">
          <StackChart  />
          </CCol>
         
         
          {/* <Daughhut/> */}
         
          {/* </div> */}
        {/* </CCardBody> */}
    </>
  )
  }
}

export default Dashboard
