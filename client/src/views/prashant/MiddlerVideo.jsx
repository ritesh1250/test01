import React, { Component } from 'react';
import OtherVideoList from "./videoPart2/OtherVideoList"
import { Scrollbars } from 'rc-scrollbars';
import OtherVideoDetails from "./videoPart2/OtherVideoDetails";

import { ToastContainer, toast } from 'react-toastify';
import FlagCheckBox from "./FlagCheckBox"
import axios  from "axios";
import ClientComponent from "./ClientComponent";
import auth from "./services/authServices";
import apiUrl from "./config.json";
// import  CheckBox from "./MultiSelectCheclbox";

// import "./style1.css"
import {
    // CCard,
    CRow,
   
    CFormGroup,
    CInputCheckbox,
    CLabel,
    CCol
} from '@coreui/react'

class SimpleChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos:[],
      data:[],
      selectedVideo:null,
      flags:[],
      flagData:[],
      flagCB:[],
      topics:[],
      topicCB:[],
      user:{}
      }
      //this.state.bind(allocateddata);
  }

  listarr =[];
  async componentDidMount(){
    const tokenStr=localStorage.getItem("token")
    const user1=auth.getCurrentUser();
  const data1 = await axios.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
  const data2 = await axios.get(apiUrl.apiEnd+"/flagData",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
  const data3 = await axios.get(apiUrl.apiEnd+"/topicdata",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })

  this.setState({videos:data1.data.result,data:data1,selectedVideo:data1.data.result[0],user:user1,flags:data2.data.flagname,topics:data3.data.topicName})
}
handleDeleteVideo= async(dataUpdate,video)=>{
  const tokenStr = localStorage.getItem("token")
    const msg = await axios.post(apiUrl.apiEnd+"/approvepost", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    const user1=auth.getCurrentUser();
    const data1=[...this.state.videos];
    const sts=data1.filter((n1)=> n1.id !== video.id )
this.setState({videos:sts,selectedVideo:sts[0],flagData:[]})
  if(this.state.videos.length<5){
    const allocateddaaata =  axios.get(apiUrl.apiEnd+"/moderatorallocate",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    const data1 = await axios.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    this.setState({videos:data1.data.result,data:data1,selectedVideo:data1.data.result[0],user:user1})
  }
    }

  render() { 
    return (
                 
      <div className=" row">
      {this.state.user ?  <ClientComponent/> : console.log("userOffline")}
     <div className=" col-xl-8 col-lg-3 col-md-8 col-sm-12">
   <OtherVideoDetails  video={this.state.selectedVideo} onVideoDelete={this.handleDeleteVideo} flags={this.state.flags} topics={this.state.topics}/>
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
{/* Same as */}
<ToastContainer />
   <div className=" col-xl-4 col-lg-3 col-md-4 col-sm-12" >
   <Scrollbars style={{padding:0,margin:0}}>
       <OtherVideoList 
       videos={this.state.videos}
       onVideoSelect={selectedVideo => this.setState({selectedVideo})}
        />
       </Scrollbars>
       </div>
       </div>
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
    //     const data1 = await axios.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
    //     const data2 = await axios.get(apiUrl.apiEnd+"/flagData",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
        
    //   this.setState({videos:data1.data.result,data:data1,selectedVideo:data1.data.result[0],user:user1,flags:data2.data.flagname})
     
    //  }
  
    
// handleDeleteVideo= async(dataUpdate)=>{
//   const tokenStr = localStorage.getItem("token")
//     const msg = await axios.post(apiUrl.apiEnd+"/poststatusupdate", dataUpdate, { headers: { "Authorization": `Bearer ${tokenStr}` } })
//     const user1=auth.getCurrentUser();
//   const data1 = await axios.get(apiUrl.apiEnd+"/moderator",{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
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