import React, { useEffect, useState } from 'react';
import "../style.css"
import "../Element.css";
import ReactPlayer from "react-player";
import Select from 'react-select';
import { toast } from 'react-toastify';
// import {Button,Modal} from "react-bootstrap";
import auth from "../services/authServices"
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
// import apiUrl from "../config.json";
// import { notification } from 'antd';
// import FlagCheckBox from "../FlagCheckBox"
// import Categoryflag from "../Categoryflag"
import "./toastStyle.css"
import {
  CRow,
  CCol,
  CButton,
  CCarousel,
  CCarouselItem,
  CCarouselControl,
  CCarouselInner
} from '@coreui/react'
// import axios from 'axios';
// import { green, lightGreen } from '@material-ui/core/colors';

const VideoDetail = ({ video, onVideoDelete, flags, topics }) => {
  
  const [index, setIndex] = useState(0);
  const [sts1, setSts] = useState();
  const [comment, setComment] = useState("");
  const [flagData, setFlagData] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [selectedTopic, setSelectedTpoic] = useState([]);
  const [selectedValue, setselectedValue] = useState([]);
  // const handleClose = () => setShow(false);

  // useEffect(()=>{
  //   const st2 = JSON.parse(JSON.parse(JSON.stringify(video.posts)))
  //  return setSts(st2[0])
  // })
  const sts = JSON.parse(JSON.parse(JSON.stringify(video.posts)))
  // console.log(sts)
  
  const user = auth.getCurrentUser();
  // if (video) {
  //   setSts()
  //   return <div className="loading-video"></div>;
  // }

  
  // console.log(JSON.parse(JSON.parse(JSON.stringify(video.posts)))[0].post)
  var mydate = new Date(video.createdAt)
 
  const date = new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(mydate);

  const handleApprove = (res) => {
    // if(comment){
      if(user.role_name==="Agent"){
    if ((topicData.length > 0 && flagData.length === 0)) {
      const dataUpdate = { post_id: video.myautoid, status: 1, topicData: topicData }
      // setMessage(msg.data.message)
      // setColor("green")
      // setShow(true)
      onVideoDelete(dataUpdate, video).then((res) => {
        toast('Post Approved', {
          position: "top-right",
          autoClose: 2005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      setFlagData([])
      setComment("")
      setTopicData([])
      setSelectedTpoic([])
      setselectedValue([])
    }
    else {
      toast.error('select topic and not select flag', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }
  }else{
    if ((comment)) {
      const dataUpdate = { post_id: video.myautoid, status: 1,comment: comment}
      // setMessage(msg.data.message)
      // setColor("green")
      // setShow(true)
      onVideoDelete(dataUpdate, video).then((res) => {
        toast('Post Approved', {
          position: "top-right",
          autoClose: 2005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      })
      setFlagData([])
      setComment("")
      setTopicData([])
      setSelectedTpoic([])
      setselectedValue([])
    }
    else {
      toast.error('Please enter comment', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
  
}
    // }else{
    //   setColor("red")
    //   setMessage("Please add some comment on this post for Approve!!")
    //   setShow(true)
    // }
  }
  const handleReject = () => {
    if(user.role_name==="Agent"){
    if ((flagData.length > 0) && (comment) && (topicData.length > 0)) {
      // alert('done')
      const dataUpdate = { post_id: video.myautoid, status: 0, comment: comment, topicData: topicData, flagData: flagData }
      // setColor("green")
      // setMessage("done")
      // setShow(true)
      onVideoDelete(dataUpdate, video).then(() => {
        toast.warning('Post Rejected', {
          position: "top-right",
          autoClose: 2005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      setFlagData([])
      setComment("")
      setTopicData([])
      setSelectedTpoic([])
      setselectedValue([])
    }
    else {
      toast.error('Write Comment,select topic and select flags', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // alert('Write Comment and select flags')
      // setColor("red")
      // setMessage("Please choose flag and add some resaon in comment box for reject!!")
      // setShow(true)
    }
  }else{
    if ( (comment)) {
      // alert('done')
      const dataUpdate = { post_id: video.myautoid, status: 0,comment: comment }
      // setColor("green")
      // setMessage("done")
      // setShow(true)
      onVideoDelete(dataUpdate, video).then(() => {
        toast.warning('Post Rejected', {
          position: "top-right",
          autoClose: 2005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      setFlagData([])
      setComment("")
      setTopicData([])
      setSelectedTpoic([])
      setselectedValue([])
    }
    else {
      toast.error('Please enter comment', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
}
  }
  const handleHold = async () => {
    if ((flagData.length > 0) && (comment) && (topicData.length > 0)) {
      // alert('done')
      const dataUpdate = { post_id: video.myautoid, status: 'H', comment: comment, topicData: topicData, flagData: flagData }
      onVideoDelete(dataUpdate, video).then((res) => {
        toast.dark('Post Holded', {
          position: "top-right",
          autoClose: 2005,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
      setFlagData([])
      setComment("")
      setTopicData([])
      setSelectedTpoic([])
      setselectedValue([])
    }
    else {
      toast.error('Write Comment,select topic and select flags', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    //   const tokenStr=localStorage.getItem("token")
    //   const dataUpdate={post_id:video.myautoid,status:0}
    //  await axios.post("http://54.236.125.14:2005/poststatusupdate",{dataUpdate, headers: {"Authorization" : `Bearer ${tokenStr}`} })
  }
  const handleChange = (e) => {
    const { currentTarget: input } = e
    setComment(input.value)
  }
  const handleOptionChange = (selectedOption) => {
    //console.log("lof:"+flagCB[0].flagid)
    let arrayNames = selectedOption.map(n1 => n1.value);
    setFlagData(arrayNames)
    setselectedValue(selectedOption)

  }
  const handleTopicChange = (selectedOption) => {

    setTopicData(selectedOption.value)
    setSelectedTpoic(selectedOption)
  }
  const handleVideo = (n) => {
    // console.log(str.length)
    if (index + n <= sts.length - 1) {
      // console.log("dssjdajsdadi", index)
      setSts(sts[index + n])
      setIndex(index + n)
    } else {
      // console.log("sts[0]")
      setSts(sts[0])
      setIndex(0)
    }
  }
  // console.log(index)
  return (
    <div className="video-detail ">
      <div className="embed-responsive embed-responsive-16by9 video-detail-animation" style={{ height: 350 }}>
        {/* <img src={sts[0].post} alt="post" /> */}
        {sts !== null ? sts[0].image === 0 ? (
          <ReactPlayer
            playing
            className='react-player embed-responsive-item"'
            url={sts[index].post}
            width='100%'
            height='20%'
            controls
            onEnded={() => handleVideo(1)}
          />
        ) : (
          <CCarousel className="embed-responsive-item">
            <CCarouselInner>
              {sts.map(ne => (
                <CCarouselItem>
                <img style={{"objectFit":"contain"}} height="348" className="d-block w-100" src={ne.post} alt="slide 1" />
              </CCarouselItem>
              ))}
            
            </CCarouselInner>
            <CCarouselControl direction="prev" />
            <CCarouselControl direction="next" />
          </CCarousel>
          // <img   alt="sts" />
        ) : null}
        {/* <iframe className="embed-responsive-item"  src="https://bestone-bucket-node.s3.ap-south-1.amazonaws.com/userUploads/m3w3x1PHxAOmS.mp4">
        </iframe> */}
      </div>
      <div className="details ">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#ffffff", padding: 5, }}>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 row">
            <img src="https://bestone-bucket-node.s3.ap-south-1.amazonaws.com/userUploads/j1BraXN9Kbxar.JPEG" alt="src" style={{ width: 30, height: 30, borderRadius: 15, }} />
            <span className="col-9" style={{ color: "black", fontWeight: "bold", }}>Post Id : {video.myautoid}</span>
            {/* <ThumbUpIcon  style={{color:"green",}}/><span  style={{color:"black",marginLeft: 5,}}>93</span>
       <ThumbDownIcon  style={{color:"red",marginLeft: 10,}}/><span  style={{color:"black",marginLeft: 5,}}>123</span> */}
          </div>
          {/* <div className="col-9" style={{color:"black",fontWeight:"bold",}}>User Id : {video.userId}</div> */}
         {sts.length>1 ? <div className="row ml-2">
            <div style={{ color: "black", fontWeight: "bold" }}>Note : </div>
            <div style={{ color: "red" }}>This Post have multiple images/videos so go through all </div>
          </div>:""}
          <div className="row ml-2">
            <div style={{ color: "black", fontWeight: "bold" }}>User Id : </div>
            <div style={{ color: "black" }}>{video.userId}</div>
          </div>
          <div className="row ml-2" >
            <div style={{ color: "black", fontWeight: "bold" }}>Caption : </div>
            <span className="col-5" style={{  "word-wrap": "break-word", "display": "inline-block" }}>
              {video.caption ? decodeURI(decodeURIComponent(video.caption)).replace(/%23/g, "#").replace(/\+/g, ' ') : "No Caption"}
            </span>
            {/* <textarea style={{"display":"inline-block" }} id="country" name="country"  readonly>{decodeURI(video.caption).replace(/%23/g, "#").replace(/\+/g,' ')}</textarea> */}
            {/* <div style={{color:"black",width:"20px"}}>
           {decodeURI(video.caption).replace(/%23/g, "#").replace(/\+/g,' ')}
          </div> */}
          </div>
          <div className="row ml-2">
            <div style={{ color: "black", fontWeight: "bold" }}>Uploaded Time : </div>
            <div style={{ color: "black" }}>{date}</div>
          </div>
         {user.role_name==="Agent" ? 
        "": <>
        <div className="row ml-2">
           <div style={{ color: "black", fontWeight: "bold" }}>Holded by : </div>
           <div style={{ color: "black" }}>{video.username}</div>
         </div>
         <div className="row ml-2">
           <div style={{ color: "black", fontWeight: "bold" }}>Flag given : </div>
           <div style={{ color: "black" }}>{video.flag_name}</div>
         </div>
         <div className="row ml-2">
           <div style={{ color: "black", fontWeight: "bold" }}>Comment by mod : </div>
           <div style={{ color: "black" }}>{video.comment}</div>
         </div>
         </>}
          <div>  

            <CRow className="mb-2 mt-3">
              <CCol col="4" sm="4" md="" xl="" className="ml-xl-4 mb-xl-3 ml-md-4 mb-md-3">
                <CButton onClick={handleApprove} active block style={{ backgroundColor: "#C1F9B2" }} className="Element element " aria-pressed="true">Approve</CButton>
              </CCol>
              <CCol col="4" sm="4" md="" xl="" className="mb-lg-3 mb-md-3">
                <CButton onClick={handleReject} active block style={{ backgroundColor: "rgba(253, 55, 55, 0.700)" }} className="Element element tada" aria-pressed="true">Reject</CButton>
              </CCol>
              {user.role_name === "Agent" ? <CCol col="4" sm="4" md="" xl="" className="mb-lg-3 mr-lg-4 mb-xl-3 mr-xl-4 mb-md-3 mr-md-4 ">
                <CButton onClick={handleHold} active block className="Element element tada" style={{ backgroundColor: "rgba(119, 117, 117, 0.981)" }} aria-pressed="true">Hold</CButton>
              </CCol> : ""}
            </CRow>
            {/* {video.snippet.description} */}
          </div>
          <form>
            <div className="form-group">
              <input
                value={comment}
                onChange={handleChange}
                id="comment"
                name="comment"
                placeholder="Enter comment on this post"
                className="form-control"
              />
            </div>

          </form>
         {user.role_name === "Agent" ?
         <>
         <Select
            // defaultValue={selectedValue}
            value={selectedValue}
            isMulti
            options={flags}
            onChange={handleOptionChange}
            className="basic-multi-select"
            // classNamePrefix="Select Flag"
            placeholder="Select Flag"
          />
          <br></br>
          <Select
            // defaultValue={selectedValue}
            value={selectedTopic}
            options={topics}
            onChange={handleTopicChange}
            className="basic-multi-select"
            placeholder="Select Topic"
          />
</>:""}

        </div>


      </div>
      {/* <Modal show={show} onHide={handleClose}> */}
      {/* <Modal.Header closeButton  style={{backgroundColor:"rgba(196, 238, 176, 0.981)"}}>
          <Modal.Title>Modal heading</Modal.Title>
           style={{backgroundColor:"rgba(196, 238, 176, 0.981)"}}
 style={{backgroundColor:"rgba(196, 238, 176, 0.981)"}}
        </Modal.Header> */}
      {/* <Modal.Body style={{color:color1}} >{message}</Modal.Body> */}
      {/* <Modal.Footer > */}
      {/* <Button variant="success" onClick={handleClose}>
            Close
       </Button> */}
      {/* </Modal.Footer> */}
      {/* </Modal> */}
    </div>

  );
};

export default VideoDetail;