import React, { Component } from 'react';
import { paginate } from "./paginate"
import ReactPlayer from "react-player";
import { Button, Modal } from "react-bootstrap";
// import "./Element.css"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,

} from '@coreui/react'


// const fields = ['name','registered', 'role', 'status','Enable/Desable',"edit"]

class MedlyHoldTable extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    show: false,
    sts: ""
  }
  handleClose = () => {
    this.setState({ show: false })
  }
  handleVideo = (n1) => {
    this.setState({ sts: n1.post_video, show: true })
  }
  handlebutton = (n) => {
    this.setState({ currentPage: n })
  }
  render() {
    const { currentPage, pageSize } = this.state;
    const { page, videos } = this.props;
    let data = paginate(videos, currentPage, pageSize)
    return (
      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
              </CCardHeader>
              <h5>&nbsp;&nbsp;Number of Post : {videos.length}</h5>
              <CCardBody>

                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="row border ">
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Post Id</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>User Id</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Comment</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Flag Name</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Created At</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>View Post</div>

                  </div>

                  {data.map((n1, index) => (
                    <div key={index} >

                      <div className="row border ">
                        <div className="col-2 text-center  p-2 text-white bg-dark " >{n1.medly_postid}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.user_id}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.comment}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark ">{n1.flag_name}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark ">{new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(n1.created_date))}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark ">
                          <button className="btn btn-success" onClick={() => { this.handleVideo(n1) }}>View Post</button>
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
        </CRow>
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

export default MedlyHoldTable
