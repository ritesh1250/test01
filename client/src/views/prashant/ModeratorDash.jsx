import React, { Component } from 'react'
import { Player } from "video-react";
import {
    CCard,
  CRow,
  CCol,
  CCardBody,
  CCardFooter,
  CButton,
  CFormGroup,
  CInputCheckbox,
  CLabel
} from '@coreui/react'

import usersData from '../users/UsersData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'bg-success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name','registered', 'role', 'status']

class Hold extends Component {
    state = { 
        someText:["OFFENSIVE","VULGAR","PROVOCATIVE","PROFANITY","ABUSIVE"],
        text1:"",
        user:[{username:"Prashant",type:"Singh",postage:20},
        {username:"Prashant",type:"Singh",postage:20},
        {username:"Prashant",type:"Singh",postage:10},
        {username:"Prashant",type:"Singh",postage:10},
        {username:"Prashant",type:"Singh",postage:5},
        {username:"Prashant",type:"Singh",postage:5}
        ]
     }
    //  async componentDidMount(){
    //     const {data: post } = http.get(apiUrl.apiEnd+"/manage")
    
    //     this.setState({post})
    // } 
     handleChange=(e)=>{
        const { currentTarget: input } = e;
        this.setState({text1:input.name})
     }
render(){
  return (
    <>
      <CCol className="mb-3" xs="12" row sm="12" md="12" lg="12">
          {/* <CCard> */}
                 <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox 
                        custom 
                        id="inline-checkbox1" 
                        name="PROFANITY" 
                        value={this.state.text1} 
                        onChange={this.handleChange}
                      />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox1">PROFANITY</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox2">OFFENSIVE</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox3">VULGAR</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox4" name="inline-checkbox4" value="option4" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox4">PROVOCATIVE</CLabel>
                    </CFormGroup>
                    <CFormGroup variant="custom-checkbox" inline>
                      <CInputCheckbox custom id="inline-checkbox5" name="inline-checkbox5" value="option5" />
                      <CLabel variant="custom-checkbox" htmlFor="inline-checkbox5">ABUSIVE</CLabel>
                    </CFormGroup>
             {/* </CCard> */}
         </CCol>         
      <CRow>
      <CCol xs="12" sm="6" md="6" lg="6">
          <CCard>
            <CCardBody>
            <Player className="card" playsInline poster="https://video-react.js.org/assets/poster.png">
                            <source
                                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                type="video/mp4"
                            />
                            </Player>
                            <CCardFooter>Card footer</CCardFooter>
            </CCardBody>
            <CRow className="mb-2">
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="success" aria-pressed="true">Approved</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="danger" aria-pressed="true">Reject</CButton>
            </CCol>
            <CCol col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <CButton active block shape="pill" color="dark" aria-pressed="true">Hold</CButton>
            </CCol>
            </CRow>
          </CCard>
        </CCol>
      {/* <div style={{fontFamily:"sans-serif",textAlign:"center"}} className="card col-lg-6 col-md-12 col-sm-12">
                            
                            <Player className="card" playsInline poster="https://video-react.js.org/assets/poster.png">
                            <source
                                src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                type="video/mp4"
                            />
                            </Player>
                            <div className="card pb-3">
                            djfbjkefbuwjfbguiwbhqwuheruiqwehbbfujncujgferwcfbu
                            </div>
                            <div className="row mt-4">
                                <button className="btn btn-success ml-3 mr-2 pr-5 pl-5">Active</button>
                                <button className="btn btn-danger mr-2  pr-5 pl-5">Reject</button>
                                <button className="btn btn-dark  pr-5 pl-5">Hold</button>
                            </div>
                    </div> */}
                  
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div  className="row border border-dark">
                                <div className="col-4 bg-light text-center border  border-dark" style={{fontWeight:"bold"}}>USER NAME</div>
                                <div className="col-4 bg-light text-center border  border-dark" style={{fontWeight:"bold"}}>TYPE</div>
                                <div className="col-4 bg-light text-center border  border-dark" style={{fontWeight:"bold"}}>POST AGE</div>
                        </div>
                        
                        {this.state.user.map((n1,index) => (
                           <div key={index} >
                               { n1.postage<=5 ? (
                                   <div className="row border  border-dark">
                                    <div className="col-4 text-center bg-success  border border-dark">{n1.username}</div>
                                    <div className="col-4 text-center bg-success  border border-dark">{n1.type}</div>
                                    <div className="col-4 text-center bg-success  border border-dark">{n1.postage}</div>
                                    </div>
                               ):("")}
                               { n1.postage>5 && n1.postage<=10 ? (
                                   <div className="row border border-dark">
                                    <div className="col-4 text-center bg-warning  border border-dark">{n1.username}</div>
                                    <div className="col-4 text-center bg-warning  border border-dark">{n1.type}</div>
                                    <div className="col-4 text-center bg-warning  border border-dark">{n1.postage}</div>
                                    </div>
                               ):("")}
                               { n1.postage>10 && n1.postage<=20 ? (
                                   <div className="row border border-dark">
                                    <div className="col-4 text-center bg-danger  border border-dark">{n1.username}</div>
                                    <div className="col-4 text-center bg-danger  border border-dark">{n1.type}</div>
                                    <div className="col-4 text-center bg-danger  border border-dark">{n1.postage}</div>
                                    </div>
                               ):("")}
                              
                            </div>
                        ))}
                        </div>
      </CRow>

     

     
       
    </>
  )
                               }
}

export default Hold
