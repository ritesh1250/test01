import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import {Spinner} from "react-bootstrap"
import axios from "axios";
import http from "./services/httpServices"
import auth from "./services/authServices";
import apiUrl from "./config.json";
import MedlyRejectedList from "./MedlyRejectedList";
import ModeratorRejectedList from "./ModeratorRejectedList"
import DateTime from './DateTime';
import Moment from 'moment';

// import "./style1.css"
import {
  CFormGroup,
  CCol,
  CButton,
  CInputGroup,
  CInputGroupPrepend,
  CInput

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
class RejectedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      videos1: [],
      dateT:"",
      user: {},
      page: 0,
      searchText: ""
    }
  }

  async componentDidMount() {

    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
    const data1 = await axios.post(apiUrl.apiEnd + "/modrejectpost",{}, { headers: { "Authorization": `Bearer ${tokenStr}` } }).then(
      res=>{
        // console.log(res);
        this.setState({ videos: res.data.result, videos1: res.data.result, user: user1, page: res.data.result.length })

      }).catch(err =>{
        // console.log(err.status);
      })
   

  }
  handlechange = (e) => {
    const { currentTarget: input } = e
    this.setState({ serachText: input.value })
  }

  handleSubmit2 = () => {
     console.log(this.state.dateT)
    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
   
     axios.post(apiUrl.apiEnd + "/modrejectpost", this.state.dateT,{ headers: { "Authorization": `Bearer ${tokenStr}` }}).then(
      res=>{
        // console.log(res.data.error);
        if(res.data.error==null){
          this.setState({ videos: res.data.result, videos1: res.data.result, user: user1, page: res.data.result.length })
          // console.log("wow bhaiya");
        }
        else{
          this.setState({ videos: [], videos1: [], user: user1 })

        }
       
       
      }
    ).catch(err =>{
      console.log(err.status);
      // this.setState({ videos: [], videos1: [], user: user1})
    })
  }




  handleSubmit = () => {
    const data = [...this.state.videos1]
    const user1 = auth.getCurrentUser();

    if (user1.role_name === "Agent") {
      const filterData = data.filter(n1 => n1.myautoid == this.state.serachText)
      if(!filterData.length == 0){
        this.setState({ videos: filterData, serachText: "",page:1})
      }
      else{
        alert("Post ID Not Found");
      }
      // this.setState({ videos: filterData, serachText: "" })
    } else {
      const filterData1 = data.filter(n1 => n1.medly_postid == this.state.serachText)
      if(!filterData1.length == 0){
        this.setState({ videos: filterData1, serachText: "",page:1})
      }
      else{
        alert("Post ID Not Found");
      }
      // console.log(filterData)
      // this.setState({ videos: filterData1, serachText: "" ,page:1})
    }
  }

  handleToUpdate = (someArg) => {
    this.setState({ dateT :someArg }, () =>{
     });
  }

  handleSubmit1 = () => {
    const data = [...this.state.videos1]
    this.setState({ videos: data, serachText: "" })
  }
  render() {
    return (
      <>
        {/* <div className="">
           <div className="col-12 row">
        <h2 className="col-4">Management</h2>
        <h5 className="col-8 text-right pt-3 ">Management : Reject List </h5> 
        </div>
        <hr className="bg-dark" />
       </div>
       <div className="col-12 row text-right">
         <div className="col-4 text-right">
       <button  className="col-8 btn btn-info p-3" onClick={this.handleSubmit1} style={{fontWeight:"bold"}}>Show All Post</button>
       </div>
       <div className="col-8">
        <div className=" input-group"   >
            <input type="text" className="form-control border-secondary bg-secondary p-4" value={this.state.serachText} onChange={this.handlechange} name="input1-group2" placeholder="Enter post id" aria-label="Amount (to the nearest dollar)"/>
            <div className="input-group-append">
              <span className="input-group-text border-secondary bg-secondary  " onClick={this.handleSubmit}><img  width="40" height="35" src={search3} alt="loupe"/></span>
            </div>
          </div>
          </div>
          </div> */}
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

         
          {/* <div className="m-3">
         <form onSubmit={this.handleSubmit} className="row">
                    <div className="form-group col-6">
                    <input
                    value={this.state.searchText}
                    onChange={this.handleChange}
                    type="text"
                    id="searchText"
                    name="searchText"
                    className="form-control"
                    placeholder="Search post..."
                    />
                    </div>
                    <CCol col="2" sm="2" md="2" xl="2" className="mb-lg-3 mb-md-3">
             <CButton  active block  className="bg-info Element  tada" aria-pressed="true">Search</CButton>
           </CCol>
                    </form> 
         </div> */}
          {this.state.user.role_name === "Agent" ? (
            <>
              <ModeratorRejectedList videos={this.state.videos} page={this.state.page} />
              {/* <button className="btn btn-primary " onClick={()=> this.handleBreakPoint()}>Break Button</button> */}

            </>) : (
            <>
              <MedlyRejectedList videos={this.state.videos} page={this.state.page} />





            </>)}</> : 
            <div className="text-center col-12">
               <h1>NO DATA</h1>
            {/* <Spinner animation="border" variant="primary" /> */}
            </div>}
      </>
    );
  }
}

export default RejectedList;
