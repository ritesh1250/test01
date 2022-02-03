import React, { Component } from 'react';
import ReactPlayer from "react-player";
import { paginate } from "./paginate"
import { Button, Modal } from "react-bootstrap";
// import "./Element.css"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CPagination,
  CRow,
  CCarousel,
  CCarouselItem,
  CCarouselControl,
  CCarouselInner

} from '@coreui/react'


// const fields = ['name','registered', 'role', 'status','Enable/Desable',"edit"]

class ModeratorRejectedList extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    show: false,
    sts: [],
    index:0
  }
  handlebutton = (n) => {
    this.setState({ currentPage: n })
  }
  handleClose = () => {
    this.setState({ show: false })
  }
  handleVideo = (n1) => {
    const sts1 = JSON.parse(JSON.parse(JSON.stringify(n1.posts)))
    this.setState({ sts: sts1, show: true })
  }
  handleVideo1 = (n) => {
    // console.log(str.length)
    if (this.state.index + n <= this.state.sts.length - 1) {
      // console.log("dssjdajsdadi", index)
     
     this.setState({index:this.state.index + n})
    } else {
      // console.log("sts[0]")
      this.setState({index:0})
    }
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
              <h5 className="ml-3">Number of Post : {videos.length}</h5>
              <CCardBody>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="row border ">
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Post Id</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>User Id</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Caption</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Comment</div>
                    <div className="col-1 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Flag Name</div>
                    <div className="col-1 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>Created At</div>
                    <div className="col-2 bg-light p-2 text-white text-center border bg-dark" style={{ fontWeight: "bold" }}>View Post</div>
                  </div>

                  {data.map((n1, index) => (
                    <div key={index} >

                      <div className="row  border">

                        <div className="col-2 text-center  p-2 text-white bg-dark "  >{n1.myautoid}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark "  >{n1.userId}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark " >{n1.caption ? decodeURI(n1.caption).replace(/%23/g, "#").replace(/\+/g, ' ') .substring(0, 20) : "No Caption"}</div>
                        <div className="col-2 text-center  p-2 text-white bg-dark " >{n1.comment}</div>
                        <div className="col-1 text-center  p-2 text-white bg-dark " >{n1.flag_name}</div>
                        <div className="col-1 text-center  p-2 text-white bg-dark " >{new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(n1.createdAt))}</div>

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
        </CRow>
        <Modal show={this.state.show} >

          <Modal.Body  >
          {this.state.sts.length>0 ? this.state.sts[0].image === 0 ? (
              <ReactPlayer
                playing
                className='react-player '
                url={this.state.sts[this.state.index].post}
                width='100%'
                onEnded={() => {this.handleVideo1(1)}}
                controls
              />
            ) : (
              <CCarousel className="embed-responsive-item">
              <CCarouselInner>
                {this.state.sts.map(ne => (
                  <CCarouselItem>
                  <img style={{objectFit:"contain"}} height="348" className="d-block w-100" src={ne.post} alt="slide 1" />
                </CCarouselItem>
                ))}
              
              </CCarouselInner>
              <CCarouselControl direction="prev" />
              <CCarouselControl direction="next" />
            </CCarousel>
            ) : null}
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

export default ModeratorRejectedList
