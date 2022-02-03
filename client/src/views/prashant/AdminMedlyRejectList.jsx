import React, { Component } from 'react';
import apiUrl from "./config.json";
import axios from "axios";
import http from "./services/httpServices";
import auth from "./services/authServices";
import { paginate } from "./paginate"
import ReactPlayer from "react-player";
import {Spinner} from "react-bootstrap"
import { Button, Modal } from "react-bootstrap";
// import "./Element.css"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
  CButton,
  CFormGroup,
  CInputGroup,
  CInputGroupPrepend,
  CInput
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// const fields = ['name','registered', 'role', 'status','Enable/Desable',"edit"]

class AdminMedlyRejectList extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    show: false,
    sts: "",
    videos: [],
    page: 0,
    videos1: [],
    serachText: ""
  }
  async componentDidMount() {

    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
   
    const data1 = await http.get(apiUrl.apiEnd + "/rejectedmedlypost", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    
    this.setState({ videos: data1.data.result, videos1: data1.data.result, user: user1, page: data1.data.result.length })


  }
  handlebutton = (n) => {
    this.setState({ currentPage: n })
  }
  handleClose = () => {
    this.setState({ show: false })
  }
  handleVideo = (n1) => {
    const currentv = n1.post_id;
    this.setState({ sts: n1.post_video,currentv:currentv, show: true })
    // this.setState({ sts: n1.post_video, show: true })
  }
  handlechange1 = (e) => {
    const { currentTarget: input } = e
    this.setState({ serachText: input.value })
  }
  handleSubmit2 = () => {
    const data = [...this.state.videos1]
    const user1 = auth.getCurrentUser();


    const filterData = data.filter(n1 => n1.medly_postid == this.state.serachText)
    //console.log(filterData)
    this.setState({ videos: filterData, serachText: "" })


  }
  handleSubmit1 = () => {
    const data = [...this.state.videos1]
    this.setState({ videos: data, serachText: "" })
  }
  handleApprove =  () => {
    const tokenStr = localStorage.getItem("token")
    
    const dataUpdate={post_id:this.state.currentv,status:1}
    console.log(this.state.sts)
    const msg = axios.post(apiUrl.apiEnd + "/adminapproverejectmedlypost", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
   
    msg.then((res)=>{
      this.setState({ show: false })
      const tokenStr = localStorage.getItem("token")
      const user1 = auth.getCurrentUser();
      const data1 = http.get(apiUrl.apiEnd + "/rejectedmedlypost", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    
      data1.then((data1)=>{
        this.setState({ videos: data1.data.result, videos1: data1.data.result, user: user1, page: data1.data.result.length })
       })
     
      
    })
    
  }
  //  handleReject =  () => {
  //    if((flagData.length>0 )&&(comment)&&(topicData.length>0)){
  //     // alert('done')
  //  const dataUpdate={post_id:video.myautoid,status:0,comment:comment,topicData:topicData,flagData:flagData}
  //   // setColor("green")
  //   // setMessage("done")
  //   // setShow(true)
  //   onVideoDelete(dataUpdate,video).then(()=>{
  //     toast.warning('Post Rejected', {
  //       position: "top-right",
  //       autoClose: 2005,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       });
  //   });
  //   setFlagData([])
  //   setComment("")
  //   setTopicData([])
  //   setSelectedTpoic([])
  //   setselectedValue([])
  //    }
  //    else{
  //     toast.error('Write Comment,select topic and select flags', {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       });
  //    // alert('Write Comment and select flags')
  //     // setColor("red")
  //     // setMessage("Please choose flag and add some resaon in comment box for reject!!")
  //     // setShow(true)
  //    }
  // }
  render() {
    const { currentPage, pageSize, page } = this.state;
    let data = paginate(this.state.videos, currentPage, pageSize)
    // console.log(data)
    return (
      <>
      <CFormGroup row className="m-3">
              <CCol md="12">
                <CInputGroup>
                  <CInputGroupPrepend>
                    <CButton onClick={this.handleSubmit1} type="button" color="success" >Show All Post</CButton>
                  </CInputGroupPrepend>
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary" onClick={this.handleSubmit2}><CIcon name="cil-magnifying-glass" /> Search</CButton>
                  </CInputGroupPrepend>
                  <CInput id="input1-group2" type="text" className="control" value={this.state.serachText} onChange={this.handlechange1} name="input1-group2" placeholder="Enter Post Id" />
                </CInputGroup>
              </CCol>
            </CFormGroup>
        {data.length > 0 ?
          <>
            
            <CRow>
              <CCol>
                <CCard>
                  <CCardHeader>
                    <h2>Medley Reject List</h2>
                  </CCardHeader>
                  <CCardBody>

                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="row border ">
                        <div className="col-1 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Post Id</div>
                        <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>User Id</div>
                        <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Comment</div>
                        <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Rejected by</div>
                        <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Flag given</div>
                        <div className="col-1 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Created At</div>
                        <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>View Post</div>
                      </div>

                      {data.map((n1, index) => (
                        <div key={index} >

                          <div className="row border ">
                            <div className="col-1 text-center  p-2 text-white bg-dark "  >{n1.post_id}</div>
                            <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.user_id}</div>
                            <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.comment}</div>
                            <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.username}</div>
                            <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.flag_name}</div>
                            <div className="col-1 text-center  p-2 text-white bg-dark ">{new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(n1.created_date))}</div>
                            <div className="col-2 text-center  p-2 text-white bg-dark" >
                          <button onClick={() => { this.handleVideo(n1) }} className="btn btn-success"  >View Post</button>
                        </div>
                          </div>



                        </div>
                      ))}
                    </div>

                    <CPagination
                      // nextButton={()=> this.setState({currentPage:currentPage+1})}
                      // lastButton={()=> this.setState({currentPage:currentPage-1})}
                      activePage={currentPage}
                      pages={Math.ceil(page / 10)}
                      onActivePageChange={this.handlebutton}
                    />

                  </CCardBody>
                </CCard>
              </CCol>
            </CRow></> :  <div className="text-center col-12">
                    <Spinner animation="border" variant="primary" />
                    </div>}
        <Modal show={this.state.show} >

          <Modal.Body  >
            {/* { JSON.parse(JSON.parse(JSON.stringify(this.state.sts)))[0].image === 0 ? ( */}

            <ReactPlayer
              playing
              className='react-player'
              url={this.state.sts}
              width='100%'

              controls
            />

            {/* ) : (
                         <img className="" width="200" height="150"  src={JSON.parse(JSON.parse(JSON.stringify(this.state.sts)))[0].post} alt="sts" />
                       )} */}
            <CRow className="mb-2 mt-3">
              <CCol col="4" sm="4" md="" xl="" className="ml-xl-4 mb-xl-3 ml-md-4 mb-md-3">
                <CButton onClick={this.handleApprove} active block style={{ backgroundColor: "#C1F9B2" }} className="Element element " aria-pressed="true">Approve</CButton>
              </CCol>
              {/* <CCol col="4" sm="4" md="" xl="" className="mb-lg-3 mb-md-3">
                <CButton onClick={this.handleReject} active block style={{ backgroundColor: "rgba(253, 55, 55, 0.700)" }} className="Element element tada" aria-pressed="true">Reject</CButton>
              </CCol> */}

            </CRow>
          </Modal.Body>
          <Modal.Footer >
            <Button variant="success" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}

export default AdminMedlyRejectList
