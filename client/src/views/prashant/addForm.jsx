import React, { Component } from 'react';
import * as userServices from "./services/userServices";
import { ToastContainer, toast } from 'react-toastify';
import apiUrl from "./config.json";
import axios from "axios";
import auth from "./services/authServices";
import http from "./services/httpServices"
import 'react-toastify/dist/ReactToastify.css';
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect,
  CCardHeader,
  CFormGroup,
  CLabel,
  CFormText,
  CCardFooter
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

class Register extends Component {
  state = {
    allUser: [],
    user: { firstName: "", lastName: "", username: "", email: "", password: "", role_name: "" },
    confermPassword: "",
    errors: {},
    value1: "valid",
  }



  handleSubmit = async (e) => {
    e.preventDefault();
    // const error1={...this.state.errors};
    const error1 = await this.validate();
    const { user, errors } = this.state;
   
    const sts = Object.values(errors).map(n1 => n1 !== "")
    const sts1 = sts.filter(n1 => n1 == true)
    if (sts1.length === 0 && Object.keys(error1).length === 0) {
      //  console.log("prbhjsbjjsdsjdjdsjk")
      const response = await userServices.register(user)
      
      if (response.status === 200) {
        toast.success("Succuessfully created", {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        this.props.history.push("/manage")

      } else {

        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        //alert(err.response.data.error) 

      }
      //  this.props.history.push("/manage")


    } else {
      if (sts1.length === 0) {
        // console.log("djfnjkfdnj")
        this.setState({ errors: error1 })
      }
      toast.error("Please enter all the data in the correct form", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    //   localStorage.setItem("token",response.headers["x-auth-token"])
    //  window.location="/";

  };
  validate = async() => {
    let errs = {};
    if (!this.state.user.firstName.trim()) errs.firstName = "First name is required";
    if (!this.state.user.lastName.trim()) errs.lastName = "Last name is required";
    if (!this.state.user.username.trim()) errs.username = "Username is required";
    if (this.state.user.username.trim()){ 
      const data1 = await axios.post(apiUrl.apiEnd + "/useravailability",{username:this.state.user.username.trim()})
     
     if(data1.status==205){ 
       
       errs.username = "Username is already exist";
      }
      // return "Username is should be greater than 3 and less than 15 character";
    }
    if (!this.state.user.email.trim()) errs.email = "Email must be required";
    if (!this.state.user.password.trim()) errs.password = "Password is required";
    if (!this.state.user.role_name.trim()) errs.role_name = "Role name is required";
    if (!this.state.confermPassword.trim()) errs.confermPassword = "Confirm Password is required";
    return errs;
  };
  validateInput = (e) => {
    switch (e.currentTarget.name) {
      case "firstName":
        
        if (!e.currentTarget.value.trim()) return "First name is must be  required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "First name is should be greater than 3 and less than 15 character";
        if (!RegExp(/^[A-Za-z]+$/).test(e.currentTarget.value)) return "First name is must be  valid";
        break;
      case "lastName":
        if (!e.currentTarget.value.trim()) return "Last name is must be  required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "Last name is should be greater than 3 and less than 15 character";
        if (!RegExp(/^[A-Za-z]+$/).test(e.currentTarget.value)) return "Last name is must be  valid";
        break;
      case "username":
        if (!e.currentTarget.value.trim()) return "Username is must be  required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "Username is should be greater than 3 and less than 15 character";
        // if (e.currentTarget.value.trim().length < 4 ){ 
        //   const data1 = await axios.post(apiUrl.apiEnd + "/useravailability",{username:e.currentTarget.value.trim()})
         
        //  if(data1.status==205){ 
           
        //    return "Username is already exist";
        //   }
        //   // return "Username is should be greater than 3 and less than 15 character";
        // }
        break;
      case "email":
        if (!e.currentTarget.value.trim()) return "Email is must be  required";
        if (!RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm).test(e.currentTarget.value)) return "Enter Email is must be  valid";
        break;

      case "password":
        if (!e.currentTarget.value.trim())
          return "password must be required";
        break;
      case "confermPassword":
        if (e.currentTarget.value.trim() !== this.state.user.password)
          return "password must be same";
        break;
      default:
        break;
    }
    return "";
  }

  handlechange = e => {
    let errString = this.validateInput(e);
    const errors = { ...this.state.errors };
    errors[e.currentTarget.name] = errString;
    const data = { ...this.state.user };

    const { currentTarget: input } = e
    if (input.name === "confermPassword") {
      var conf = input.value;
      this.setState({ confermPassword: conf, errors: errors });
    } else {
      data[input.name] = input.value;
      // console.log(errors)
      this.setState({ user: data, errors: errors });
    }
    // this.setState({errors:errors });
  };
  handleReset=()=>{
    const user1={ firstName: "", lastName: "", username: "", email: "", password: "", role_name: "" }
    this.setState({user:user1,confermPassword:"",errors:{}})
  }
  render() {
    const { user, value1, errors } = this.state
    // console.log(errors)
    return (
      // <div className="c-app c-default-layout ">
      //   <CContainer>
      //     <CRow className="bg-white">
      //       <CCol md="9" lg="8" xl="8">
      //         {/* <CCard className="mx-4"> */}
      //           <CCardBody className="p-4">
      //             <CForm >

      //               <ToastContainer
      //                 position="top-right"
      //                 autoClose={5000}
      //                 hideProgressBar={false}
      //                 newestOnTop={false}
      //                 closeOnClick
      //                 rtl={false}
      //                 pauseOnFocusLoss
      //                 draggable
      //                 pauseOnHover
      //               />
      //               {/* Same as */}
      //               <ToastContainer />
      //               <CInputGroup >
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     First Name
      //                 </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 {/* <CInput valid id="inputIsValid" /> */}
      //                 <CInput type="text" name="firstName" value={user.firstName} onChange={this.handlechange} placeholder="First name" autoComplete="firstName" />

      //               </CInputGroup>
      //               {errors.firstName ? (
      //                 <span className="alert text-danger">{errors.firstName}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     Last Name
      //                 </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CInput value={user.lastName} name="lastName" onChange={this.handlechange} type="text" placeholder="Last name" autoComplete="lastName" />
      //               </CInputGroup>
      //               {errors.lastName ? (
      //                 <span className="alert text-danger">{errors.lastName}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     <CIcon name="cil-user" />
      //                   </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CInput value={user.username} name="username" onChange={this.handlechange} type="text" placeholder="Username" autoComplete="username" />

      //               </CInputGroup>
      //               {errors.username ? (
      //                 <span className="alert text-danger">{errors.username}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>@</CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CInput value={user.email} name="email" onChange={this.handlechange} type="email" placeholder="Email" autoComplete="email" />
      //               </CInputGroup>
      //               {errors.email ? (
      //                 <span className="alert text-danger">{errors.email}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     Role Name
      //                 </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CSelect custom id="role_name" name="role_name" value={user.role_name} onChange={this.handlechange}>
      //                   <option value="0">Please select role name</option>
      //                   <option value="Agent">Agent</option>
      //                   <option value="Medly">Medly</option>
      //                 </CSelect>
      //               </CInputGroup>
      //               {errors.role_name ? (
      //                 <span className="alert text-danger">{errors.role_name}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     <CIcon name="cil-lock-locked" />
      //                   </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CInput value={user.password} name="password" onChange={this.handlechange} type="password" placeholder="Password" autoComplete="new-password" />
      //               </CInputGroup>
      //               {errors.password ? (
      //                 <span className="alert text-danger">{errors.password}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CInputGroup className="mt-3 mb-4">
      //                 <CInputGroupPrepend>
      //                   <CInputGroupText>
      //                     <CIcon name="cil-lock-locked" />
      //                   </CInputGroupText>
      //                 </CInputGroupPrepend>
      //                 <CInput value={this.state.confermPassword} name="confermPassword" onChange={this.handlechange} type="password" placeholder="Confirm  password" autoComplete="new-password" />
      //               </CInputGroup>
      //               {errors.confermPassword ? (
      //                 <span className="alert text-danger">{errors.confermPassword}</span>
      //               ) : (
      //                 ""
      //               )}
      //               <CButton color="success" block onClick={this.handleSubmit}>Add Moderator</CButton>
      //             </CForm>
      //           </CCardBody>

      //         {/* </CCard> */}
      //       </CCol>
      //     </CRow>
      //   </CContainer>
      // </div>
      <CCol xs="12" md="12">
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
       <CCard>
            
            <CCardBody>
              <CForm action="" method="post" >
                <CRow>
                  <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">First Name</CLabel>
                  <CInput type="text" name="firstName" value={user.firstName} onChange={this.handlechange} placeholder="First name" autoComplete="firstName"  />
                  {errors.firstName ? (
                      <CFormText color="danger" className="help-block">{errors.firstName}</CFormText>
                     ) : (
                       ""
                     )}
                  
                </CFormGroup>
                </CCol>
                <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">Last Name</CLabel>
                  <CInput value={user.lastName} name="lastName" onChange={this.handlechange} type="text" placeholder="Last name" autoComplete="lastName"/>
                  {errors.lastName ? (
                      <CFormText color="danger" className="help-block">{errors.lastName}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
                  <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">Username</CLabel>
                  <CInput value={user.username} name="username" onChange={this.handlechange} type="text" placeholder="Username" autoComplete="username" />
                  {errors.username ? (
                      <CFormText color="danger" className="help-block">{errors.username}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">Role</CLabel>
                  <CSelect custom id="role_name" name="role_name" value={user.role_name} onChange={this.handlechange}>
                       <option value="" >Please select role name</option>
                         <option value="Agent">Meest</option>
                        <option value="Medly">Medley</option>
                      </CSelect>
                      {errors.role_name ? (
                      <CFormText color="danger" className="help-block">{errors.role_name}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
                <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">Email</CLabel>
                  <CInput value={user.email} name="email" onChange={this.handlechange} type="email" placeholder="Email" autoComplete="email" required />
                  {errors.email ? (
                      <CFormText color="danger" className="help-block">{errors.email}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                </CRow>
                <CRow>
                  <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputName2" className="pr-1">Password</CLabel>
                  <CInput value={user.password} name="password" onChange={this.handlechange} type="password" placeholder="Password" autoComplete="new-password" required />
                  {errors.password ? (
                      <CFormText color="danger" className="help-block">{errors.password}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                <CCol>
                <CFormGroup className="pr-1">
                  <CLabel htmlFor="exampleInputEmail2" className="pr-1">Confirm Password</CLabel>
                  <CInput value={this.state.confermPassword} name="confermPassword" onChange={this.handlechange} type="password" placeholder="Confirm  password" autoComplete="new-password" required />
                  {errors.confermPassword ? (
                      <CFormText color="danger" className="help-block">{errors.confermPassword}</CFormText>
                     ) : (
                       ""
                     )}
                </CFormGroup>
                </CCol>
                </CRow>
              </CForm>
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" size="sm" color="success"  onClick={this.handleSubmit} className="mr-2"><CIcon name="cil-scrubber"  /> Add Moderator</CButton>
              <CButton type="reset" size="sm" color="danger" onClick={this.handleReset}><CIcon name="cil-ban" /> Reset</CButton>
            </CCardFooter>
          </CCard>
      </CCol>
    )
  }
}

export default Register
