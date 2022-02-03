import React, { Component } from 'react';
import VideoList from "./videoPart/videoList"
import { Scrollbars } from 'rc-scrollbars';
import VideoDetail from "./videoPart/videoDetails";
import http from "./services/httpServices"
import { ToastContainer, } from 'react-toastify';

import auth from "./services/authServices";
import apiUrl from "./config.json";
import OtherVideoDetails from "./videoPart2/OtherVideoDetails";
import OtherVideoList from "./videoPart2/OtherVideoList"
// import  CheckBox from "./MultiSelectCheclbox";

// import "./style1.css"
// import {
//     // CCard,
//     CRow,

//     CFormGroup,
//     CInputCheckbox,
//     CLabel,
//     CCol
// } from '@coreui/react'

class SimpleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      data: [],
      selectedVideo: null,
      flags: [],
      flagData: [],
      flagCB: [],
      topics: [],
      topicCB: [],
      user: {},
      warningTime: 240000,
      signoutTime: 200500,
      count: 0,
      flag1: false,
      buttonName: "Stop Allocation"
    }
    //this.state.bind(allocateddata);
  }

  listarr = [];
  async componentDidMount() {
    this.events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];
    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
    // console.log(user1)
    const data1 = await http.get(apiUrl.apiEnd + "/moderator", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const data2 = await http.get(apiUrl.apiEnd + "/flagData", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const data3 = await http.get(apiUrl.apiEnd + "/topicdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    // console.log(data1)
    // videos:data1.data.result,selectedVideo:data1.data.result[0],
    this.setState({ videos: data1.data.result, selectedVideo: data1.data.result[0], data: data1, user: user1, flags: data2.data.flagname, topics: data3.data.topicName })
    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);

    }

    this.setTimeout();
  }
  clearTimeoutFunc = () => {
    if (this.warnTimeout) clearTimeout(this.warnTimeout);

    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  };

  setTimeout = () => {
    // console.log("hello")
    this.warnTimeout = setTimeout(this.warn, this.state.warningTime);
    this.logoutTimeout = setTimeout(this.logout, this.state.signoutTime);
  };

  resetTimeout = () => {
    this.clearTimeoutFunc();
    this.setTimeout();
  };

  warn = () => {
    // window.alert("You will be logged out automatically in 1 minute")
    console.log('You will be logged out automatically in 1 minute.');
  };

  logout = () => {
    // Send a logout request to the API
    console.log('Sending a logout request to the API...');
    this.destroy();
  };

  destroy = async () => {
    //clear the session
    const tokenStr = localStorage.getItem("token")
    const user = auth.getCurrentUser();
    //  console.log(tokenStr)
    const sts = await http.post(apiUrl.apiEnd + "/logout", { userid: user.id, sessionid: user.sessionid })
    //  console.log(sts)
    localStorage.removeItem("token")
    // this.props.history.push("/login")
    window.location = '/'
  };
  handleDeleteVideo = async (dataUpdate, video) => {
    const tokenStr = localStorage.getItem("token")
    await http.post(apiUrl.apiEnd + "/approvepost", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const user1 = auth.getCurrentUser();
    const data1 = [...this.state.videos];
    const sts = data1.filter((n1) => n1.id !== video.id)
    this.setState({ videos: sts, selectedVideo: sts[0], flagData: [] })
    if (this.state.videos.length < 5 && this.state.count === 0) {
      http.get(apiUrl.apiEnd + "/moderatorallocate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
      const data1 = await http.get(apiUrl.apiEnd + "/moderator", { headers: { "Authorization": `Bearer ${tokenStr}` } })
      this.setState({ videos: data1.data.result, data: data1, selectedVideo: data1.data.result[0], user: user1 })
    }
  }

  handleBreak = async (flag1) => {
    if (flag1) {
      this.setState({ flag1: flag1, count: 1, buttonName: "Start Allocation" })

    } else {
      this.setState({ flag1: flag1, count: 0, buttonName: "Stop Allocation" })

    }
  }
  handleAllocation = async () => {
    const tokenStr = localStorage.getItem("token")
    const user1 = auth.getCurrentUser();
    // console.log(user1)
   const sts = await http.get(apiUrl.apiEnd + "/moderatorallocate", { headers: { "Authorization": `Bearer ${tokenStr}` } })
  //  console.log(sts)
    const data1 = await http.get(apiUrl.apiEnd + "/moderator", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const data2 = await http.get(apiUrl.apiEnd + "/flagData", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const data3 = await http.get(apiUrl.apiEnd + "/topicdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    // videos:data1.data.result,selectedVideo:data1.data.result[0],
    // this.setState({ data: data1, user: user1, flags: data2.data.flagname, topics: data3.data.topicName })
    this.setState({ videos: data1.data.result, selectedVideo: data1.data.result[0], data: data1, user: user1, flags: data2.data.flagname, topics: data3.data.topicName })
   
    
  }
  render() {
    return (
      <>
        {this.state.videos.length > 0 ?
          (

            <>

              <div className=" row">

                {this.state.user.role_name === "Agent" ? (
                  <>
                    <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12">
                      <VideoDetail video={this.state.selectedVideo} onVideoDelete={this.handleDeleteVideo} flags={this.state.flags} topics={this.state.topics} />
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
                      <div className="col-12 ">
                        <button className="col-12 btn btn-info" onClick={() => this.handleBreak(!this.state.flag1)}>{this.state.buttonName}</button>

                      </div>

                      <Scrollbars style={{ padding: 0, margin: 0 }}>
                        <VideoList
                          videos={this.state.videos}
                          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                        />
                      </Scrollbars>
                    </div>
                  </>) : (
                  <>
                    <div className=" col-xl-8 col-lg-8 col-md-8 col-sm-12">
                      <OtherVideoDetails video={this.state.selectedVideo} onVideoDelete={this.handleDeleteVideo} flags={this.state.flags} topics={this.state.topics} />
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
                      <div className="col-12 ">
                        <button className="col-12 btn btn-info" onClick={() => this.handleBreak(!this.state.flag1)}>{this.state.buttonName}</button>

                      </div>
                      <Scrollbars style={{ padding: 0, margin: 0 }}>
                        <OtherVideoList
                          videos={this.state.videos}
                          onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                        />
                      </Scrollbars>
                    </div>
                  </>
                )}
              </div>
            </>) : (
            <div className="row">
              <div className="col-4">
                <h4>No Post Available</h4>
              </div>
              <div className="col-8 text-right">
                <button className="btn btn-info" onClick={() => this.handleAllocation()}>Start Allocation</button>

              </div>
            </div>
          )}
      </>
    );
  }
}

export default SimpleChart;

// class SimpleChart extends Component {
    // state = { 
    //    videos:[],
    //    data:[],
    //    selectedVideo:null,
    //    flags:[],
    //    flagData:[],
    //    flagCB:[],
    //    user:{}

    //  }
    // async componentDidMount(){
    //       const tokenStr=localStorage.getItem("token")
    //       const user1=auth.getCurrentUser();
    //     const data1 = await http.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    //     const data2 = await http.get(apiUrl.apiEnd+"/flagData",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })

    //   this.setState({videos:data1.data.result,data:data1,selectedVideo:data1.data.result[0],user:user1,flags:data2.data.flagname})

    //  }


// handleDeleteVideo= async(dataUpdate)=>{
//   const tokenStr = localStorage.getItem("token")
//     const msg = await http.post(apiUrl.apiEnd+"/poststatusupdate", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
//     const user1=auth.getCurrentUser();
//   const data1 = await http.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
// this.setState({videos:data1.data.result,data:data1,selectedVideo:data1.data.result[0],user:user1})
//   }


//     render() { 


//       console.log(this.state.videos)
//         // const {flagCB,flagData,flags} =this.state;
//         // this.state.flagCB= this.makeCbStrucure1(this.state.flags, this.state.flagData);
//         return ( 



//          );
//     }
// }

// export default SimpleChart;