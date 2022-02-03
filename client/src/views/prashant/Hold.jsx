import React, { Component } from 'react';
import VideoList from "./videoPart/videoList"
import { Scrollbars } from 'rc-scrollbars';
import VideoDetail from "./videoPart/videoDetails";
import { ToastContainer } from 'react-toastify';
import axios from "axios";
import auth from "./services/authServices";
import {Spinner} from "react-bootstrap";
import apiUrl from "./config.json";
// import "./style1.css"
// import {
//     // CCard,
//     CRow,

//     CFormGroup,
//     CInputCheckbox,
//     CLabel,
//     CCol
// } from '@coreui/react'
class Hold extends Component {
    state = {
        videos: [],
        data: [],
        selectedVideo: null,
        flags: [],
        flagData: [],
        flagCB: [],
        topics: [],
        topicCB: [],
        user: {},
        warningTime: 40000,
        signoutTime: 600000,
        count: 0,
        flag1: false,
        buttonName: "Stop Allocation"

    }
    // listarr = [];
    async componentDidMount() {

        const tokenStr = localStorage.getItem("token")
        const user1 = auth.getCurrentUser();
        const data1 = await axios.get(apiUrl.apiEnd + "/holdedpost", { headers: { "Authorization": `Bearer ${tokenStr}` } })
        const data2 = await axios.get(apiUrl.apiEnd + "/flagData", { headers: { "Authorization": `Bearer ${tokenStr}` } })
        const data3 = await axios.get(apiUrl.apiEnd + "/topicdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
        this.setState({ videos: data1.data.result, data: data1, selectedVideo: data1.data.result[0], user: user1, flags: data2.data.flagname, topics: data3.data.topicName })

    }

    handleDeleteVideo = async (dataUpdate, video) => {
        const tokenStr = localStorage.getItem("token")
        const msg = await axios.post(apiUrl.apiEnd + "/adminapprovemeestpost", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
        const user1 = auth.getCurrentUser();
        const data1 = [...this.state.videos];
        const sts = data1.filter((n1) => n1.id !== video.id)
        this.setState({ videos: sts, selectedVideo: sts[0], flagData: [] })
        if (this.state.videos.length < 5 && this.state.count === 0) {
            // const allocateddaaata = axios.get(apiUrl.apiEnd + "/moderatorallocate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            const data1 = await axios.get(apiUrl.apiEnd + "/holdedpost", { headers: { "Authorization": `Bearer ${tokenStr}` } })
            this.setState({ videos: data1.data.result, data: data1, selectedVideo: data1.data.result[0], user: user1 })
        }
    }

    handleBreak = (flag1) => {
        if (flag1) {
            this.setState({ flag1: flag1, count: 1, buttonName: "Start Allocation" })
        } else {
            this.setState({ flag1: flag1, count: 0, buttonName: "Stop Allocation" })
        }
    }

    render() {
        return (
            <>
                {this.state.videos.length>0 ?
          (
            <>
          <div className="col-12 text-right">
            <button className="btn btn-info" onClick={()=>this.handleBreak(!this.state.flag1)}>{this.state.buttonName}</button> 
           
            </div>
      <div className=" row">
         
   
          <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12">
        <VideoDetail  video={this.state.selectedVideo} onVideoDelete={this.handleDeleteVideo} flags={this.state.flags} topics={this.state.topics}/>
        {/* <button className="btn btn-primary " onClick={()=> this.handleBreakPoint()}>Break Button</button> */}
        </div>
        <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      
/>
      <ToastContainer />
    
        <div className=" col-xl-4 col-lg-4 col-md-4 col-sm-12" >
          
       
        <Scrollbars style={{padding:0,margin:0}}>
            <VideoList 
            videos={this.state.videos}
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            />
            </Scrollbars>
            </div>
           
 
         
       </div>
       </>):(
          <div className="text-center col-12">
              <h1>NO DATA</h1>
          {/* <Spinner animation="border" variant="primary"  />Looding.... */}
          </div>
       )}
            </>
        );
    }
}

export default Hold;