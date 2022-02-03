import React, { Component } from 'react'
import { Player } from "video-react";
import "./Element.css"
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
const fields = ['name', 'registered', 'role', 'status']

class ModeratorPanel extends Component {
    state = {
        someText: ["OFFENSIVE", "VULGAR", "PROVOCATIVE", "PROFANITY", "ABUSIVE"],
        text1: "",
        user: [{ username: "Prashant", type: "Singh", postage: 20 },
        { username: "Prashant", type: "Singh", postage: 20 },
        { username: "Prashant", type: "Singh", postage: 10 },
        { username: "Prashant", type: "Singh", postage: 10 },
        { username: "Prashant", type: "Singh", postage: 5 },
        { username: "Prashant", type: "Singh", postage: 5 }
        ],
        image:["https://source.unsplash.com/150x80/?nature,water","https://source.unsplash.com/150x80/?nature,water","https://source.unsplash.com/150x80/?nature,water","https://source.unsplash.com/150x80/?nature,water","https://source.unsplash.com/150x80/?nature,water","https://source.unsplash.com/150x80/?nature,water"]
    }
    //  async componentDidMount(){
    //     const {data: post } = http.get(apiUrl.apiEnd+"/manage")

    //     this.setState({post})
    // } 
    handleChange = (e) => {
        const { currentTarget: input } = e;
        this.setState({ text1: input.name })
    }
    render() {
        return (
            <>
                {/* <CCol className="mb-1" xs="12" row sm="12" md="12" lg="12">
          {/* <CCard> */}
                <CFormGroup variant="custom-checkbox"  inline>
                      <CInputCheckbox 
                        custom 
                        id="inline-checkbox1" 
                        name="PROFANITY" 
                        value={this.state.text1} 
                        onChange={this.handleChange}
                      />
                      <CLabel variant="custom-checkbox" className="fs-6" htmlFor="inline-checkbox1">PROFANITY</CLabel>
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
                {/* </CCol>          */}
                <CRow>
                    <CCol xs="12" sm="12" md="12" lg="8" xl="8">
                       {/* <CCol>  */}
                        {/* <CCard className="element"> */}
                        {/* <CCardBody> */}
                            <Player  playsInline poster="https://video-react.js.org/assets/poster.png">
                                <source
                                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                                    type="video/mp4"
                                />
                            </Player>
                            <p>This video is so good..</p>
                        {/* </CCardBody> */}
                        <CRow className="">
                            <CCol col="6" sm="4" md="4" xl className="ml-4 mb-3">
                                <CButton active block color="success" className="Element element " aria-pressed="true">Approved</CButton>
                            </CCol>
                            <CCol col="6" sm="4" md="4" xl className="mb-3">
                                <CButton active block color="danger" className="Element element tada" aria-pressed="true">Reject</CButton>
                            </CCol>
                            <CCol col="6" sm="4" md="4" xl className="mb-3 mr-4 ">
                                <CButton className="" active block className="Element element tada" color="dark" aria-pressed="true">Hold</CButton>
                            </CCol>
                        </CRow>
                        {/* </CCard> */}
                        {/* </CCol> */}
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

                    {/* <div className="card mb-3 col-lg-3 " style={{height:200}}> */}
                    <CCol lg="4" md="6" sm="12" className=" ">
                    {this.state.image.map((item,index)=> (
                        <CCol className="mt-3" key={index}>
                            <CRow>
                            <CCol lg="6" className="">
                                <img src={item} alt="adidas" />
                            </CCol>
                            <CCol lg="6">
                                {/* <CCol > */}
                                    <h5 className="card-title" >Card title</h5>
                                    {/* <p >This is a wider card with supporting text.</p> */}
                                    <p ><small className="text-muted">Last updated 3 mins ago</small></p>
                                {/* </CCol> */}
                            </CCol>
                            </CRow>
                        </CCol>
                        ))}
                    {/* </div> */}
</CCol>

                </CRow>





            </>
        )
    }
}

export default ModeratorPanel;
