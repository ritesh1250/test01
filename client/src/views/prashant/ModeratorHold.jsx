import React, { Component } from 'react';
import {Spinner} from "react-bootstrap"
import http from "./services/httpServices"
import axios from "axios";
import auth from "./services/authServices";
import apiUrl from "./config.json";
import MedlyHoldTable from "./MedlyHoldTable";
import ModeratorHolTable from "./ModeratorHolTable";
import { toast } from 'react-toastify';
import exportFromJSON from 'export-from-json'
import 'react-toastify/dist/ReactToastify.css';
import Moment from 'moment';
//  import search3 from "../../assets/icons/search3.svg"
// import  CheckBox from "./MultiSelectCheclbox";
import {
  CFormGroup,
  CCol,
  CButton,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DateTime from './DateTime';
const tokenStr = localStorage.getItem("token")
const user1 = auth.getCurrentUser();
// import { icons } from 'src/assets/icons';
// import "./style1.css"


class ModeratorHold extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videos1: [],
      dateT:"",

      user: {},

      page: 0,
      serachText: ""
    }
    //this.state.bind(allocateddata);
  }

  ExportToExcel = () => {  
    if(!this.state.videos.length==0){
      const data= this.state.videos;
      const fileName="Hold data";
      const exportType="csv"
      exportFromJSON({ data, fileName, exportType }) 
    }
    else{
      alert("no data")
    }
     
  } 

  async componentDidMount() {

    // const tokenStr = localStorage.getItem("token")
    // const user1 = auth.getCurrentUser();
    const data1 = await axios.post(apiUrl.apiEnd + "/modholdedpost",{}, { headers: { "Authorization": `Bearer ${tokenStr}` } }).then(
      res=>{
        // console.log(res);
        this.setState({ videos: res.data.result, videos1: res.data.result, user: user1, page: res.data.result.length })

      }
    ).catch(err =>{
      // console.log(err.status);
    })
    // console.log(data1);
    

  }
  handlechange = (e) => {
    const { currentTarget: input } = e
    this.setState({ serachText: input.value })
  }
  handleSubmit = () => {
    
    if (!this.state.serachText == ''){
     
    const data = [...this.state.videos1]
    const user1 = auth.getCurrentUser();

    if (user1.role_name === "Agent") {
      const filterData = data.filter(n1 => n1.myautoid == this.state.serachText)
      // console.log(filterData);
      if(!filterData.length == 0){
        this.setState({ videos: filterData, serachText: "",page:1 })
      }
      else{
       
        alert("Post ID Not Found");
      }
    } else {
      const filterData1 = data.filter(n1 => n1.medly_postid == this.state.serachText)
      if(!filterData1.length == 0){
        this.setState({ videos: filterData1, serachText: "",page:1 })
      }
      else{
       
        alert("Post ID Not Found");
      }
      // console.log(filterData)
      // this.setState({ videos: filterData1, serachText: "",page:1 })
    }
  }
  else{
    // alert("eye")
    toast.error('Logged In', {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
  });
    
  }

  }



  handleSubmit1 = () => {
    const data = [...this.state.videos1]
    this.setState({ videos: data, serachText: "" })
  }
  handleSubmit2 = () => {
    // console.log(this.state.dateT)
     axios.post(apiUrl.apiEnd + "/modholdedpost", this.state.dateT,{ headers: { "Authorization": `Bearer ${tokenStr}` }}).then(
      res=>{
        if(res.data.error==null){
          this.setState({ videos: res.data.result, videos1: res.data.result, user: user1, page: res.data.result.length })
          // console.log("wow bhaiya");
        }
        else{
          this.setState({ videos: [], videos1: [], user: user1 })

        }
       
       
      }
    ).catch(err =>{
      // this.setState({ videos: [], videos1: [], user: user1})
    })
  }

  handleToUpdate = (someArg) => {
    this.setState({ dateT :someArg }, () =>{
     });
}

  render() {

    return (
      <>

 <CFormGroup row className="m-3">
         
            <CCol md="12">
              <CInputGroup>
              <DateTime handleToUpdate = {this.handleToUpdate} 
              customInput={<CInputGroupPrepend><CButton size="lg"  color="warning"><CIcon name="cil-calendar"/> Custom Date {this.state.dateT.startdate1 ? Moment(this.state.dateT.startdate1).format('DD/MM/YYYY')+'-' : ''} {this.state.dateT.enddate2 ? Moment(this.state.dateT.enddate2).format('DD/MM/YYYY') : ''}
               </CButton></CInputGroupPrepend>}
             />
              <CInputGroupPrepend>  
              <CButton onClick={this.handleSubmit2} color="info" size="lg" block>Go</CButton>
              </CInputGroupPrepend>
                
                
                {/* <CInputGroupPrepend> 
                <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                </CInputGroupPrepend>  */}
                <CInput autoComplete="off" id="input1-group2" size="lg" type="number" className="control" value={this.state.serachText} onChange={this.handlechange} name="input1-group2" placeholder="Enter post id to search" />
                <CInputGroupPrepend>
                  <CButton type="button" size="lg" color="primary" onClick={this.handleSubmit} disabled={!this.state.serachText}><CIcon name="cil-magnifying-glass" /> Search</CButton>
                </CInputGroupPrepend>
                <CInputGroupPrepend>
                  <CButton type="button" size="lg" color="success" onClick={this.handleSubmit1}  >Show All Post</CButton>
                </CInputGroupPrepend>
                {/* <CInputGroupPrepend>
                <CDropdown >
              <CDropdownToggle size="lg" color="secondary">
               
              </CDropdownToggle>
              <CDropdownMenu
                placement="bottom"
                modifiers={[{name: 'flip', enabled: false }]}
              >
                <CDropdownItem header>Export</CDropdownItem>
                <CDropdownItem onClick={this.ExportToExcel}>CSV</CDropdownItem>
                <CDropdownItem>Another Action</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            </CInputGroupPrepend> */}

              </CInputGroup>
            </CCol>
          </CFormGroup>
        {this.state.videos.length > 0 ? <>
         
          {this.state.user.role_name === "Agent" ? (
            <>
              <ModeratorHolTable videos={this.state.videos} page={this.state.page} />
              {/* <button className="btn btn-primary " onClick={()=> this.handleBreakPoint()}>Break Button</button> */}

            </>) : (
            <>
              <MedlyHoldTable videos={this.state.videos} page={this.state.page} />





            </>)} </> : 
            <div className="text-center col-12">
              <h1>NO DATA</h1>
            {/* <Spinner animation="border" variant="primary" /> */}
            </div>}
      </>
    );
  }
}

export default ModeratorHold;
