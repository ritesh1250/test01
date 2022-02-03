import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import logo from "../../../assets/icons/logo.png"
import auth from "../../prashant/services/authServices";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Login extends Component {
  state = {
    allUser:[],
    user:{username:"",password:""},
    errors: {},
    view:2,
    classes:{}
  }


handleSubmit = e => {
e.preventDefault();
try{
   const {user,view}=this.state;
   
   auth.login(user.username,user.password);
   const user1=auth.getCurrentUser();
   console.log(user1)
  
   window.location="/"
    // this.props.history.push("/layout")
}catch(ex){
  console.log(ex)
   if(ex.response && ex.response.status === 400){
       const errors={...this.state.errors};
       errors.email=ex.response.data;
       this.setState({errors});
   }
}
};




handleChange = e => {   
const data = { ...this.state.user };
const { currentTarget:input}=e
data[input.name] = input.value;
this.setState({ user: data });
};
  render(){
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" name="username" id="username"
                       value={this.state.user.username}
                       onChange={this.handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password" 
                       value={this.state.user.password}
                       onChange={this.handleChange}
                       name="password"
                       id="password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4"  onClick={this.handleSubmit}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                <img src={logo} alt="logo" width="300" height="200"></img>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
            }
}

export default Login
