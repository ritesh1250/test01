import React, { Component} from 'react';
import http from "./services/httpServices";
import apiUrl from "./config.json";
import { paginate } from "./paginate";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from "./services/authServices";
import exportFromJSON from 'export-from-json'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDropdownToggle,
  CDropdownMenu,
  CDropdown,
  CDropdownItem,
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
  CCardFooter,
  CBadge,
  CSwitch,
  CPagination,
  CDataTable,
  CCollapse
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
// import usersData from '../users/UsersData'




// const fields = ['name','registered', 'role', 'status','Enable/Desable',"edit"]


class ManageModerator extends Component {
  state = {
    details:{},
    currentPage: 1,
    pageSize: 10,
    userData: [],
    sts: true,
    user: { firstName: "", lastName: "", username: "", email: "", password: "", role_name: "" },
    view: 1,
    page: 0,
    errors: {},
    serachText: "",
    usersData1: []
  }

  async componentDidMount() {
    const tokenStr = localStorage.getItem("token")
    const data1 = await http.get(apiUrl.apiEnd + "/getalluserdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    this.setState({ usersData: data1.data.result, usersData1: data1.data.result, page: data1.data.result.length })
  }

  isFormInvalid = () => {
    let errs ={...this.state.errors}
    let errCount=Object.keys(errs).length; 
    return errCount <= 0;
 }

 ExportToExcel = () => {  
  if(!this.state.usersData.length==0){
    const data= this.state.usersData;

    // data.forEach(function(obj) {
    //   delete obj.theId;
    // });

    data.forEach(function(obj){
      delete obj.password
    });
    
    data.forEach(function(obj){
      delete obj.deleted
    });

    data.forEach(function(obj){
      delete obj.deleted_at
    });
    
    const fileName="AgentList";
    const exportType="xls"
    exportFromJSON({ data, fileName, exportType }) 
  }
  else{
    alert("no data")
  }
   
} 

  handleSubmit = async (e) => {
    e.preventDefault();
    // const error1={...this.state.errors};
    const error1 = this.validate();
    const { user, errors } = this.state;
    // console.log(errors)
    const sts = Object.values(errors).map(n1 => n1 !== "")
    const sts1 = sts.filter(n1 => n1 == true)
    if (sts1.length === 0 && Object.keys(error1).length === 0) {
      //  console.log("sdkjdkkkdksdks")
      const tokenStr = localStorage.getItem("token")
      await http.post(apiUrl.apiEnd + "/editmod", this.state.user, { headers: { "Authorization": `Bearer ${tokenStr}` } }).then(async (res) => {
        // console.log("response",res)
        toast.success('Successfuly updated', {
          position: "top-right",
          autoClose: 7000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        const data1 = await http.get(apiUrl.apiEnd + "/getalluserdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
        //console.log(data1)
        this.setState({ usersData: data1.data.result, usersData1: data1.data.result, view: 1, page: data1.data.result.length })
      })
        .catch(err => {
          toast.error(err.response.data.error, {
            position: "top-right",
            autoClose: 7000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          //alert(err.response.data.error) 
        });
    } else {
      if (Object.keys(errors).length === 0) {
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
  }
  validate = () => {
    let errs = {};
    if (!this.state.user.firstName.trim()) errs.firstName = "First name is required";
    if (!this.state.user.lastName.trim()) errs.lastName = "Last name is required";
    if (!this.state.user.username.trim()) errs.username = "Username is required";
    if (!this.state.user.email.trim()) errs.email = "Email must be required";
    if (!this.state.user.password.trim()) errs.password = "Password is required";
    // if (!this.state.user.role_name.trim()) errs.role_name = "Role name is required";
    return errs;
  };
  validateInput = e => {
    switch (e.currentTarget.name) {
      case "firstName":
        if (!e.currentTarget.value.trim()) return "First name is required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "First name is should be greater than 3 and less than 15 character";
        if (!RegExp(/^[A-Za-z]+$/).test(e.currentTarget.value)) return "First name is must be  valid";
        break;
      case "lastName":
        if (!e.currentTarget.value.trim()) return "Last name is required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "Last name is should be greater than 3 and less than 15 character";
        if (!RegExp(/^[A-Za-z]+$/).test(e.currentTarget.value)) return "Last name is must be  valid";
        break;
      case "username":
        if (!e.currentTarget.value.trim()) return "Username is required";
        if (e.currentTarget.value.trim().length < 4 || e.currentTarget.value.trim().length > 15) return "Username is should be greater than 3 and less than 15 character";
        break;
      case "email":
        if (!e.currentTarget.value.trim()) return "Email is required";
        if (!RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.currentTarget.value)) return "Enter Email is must be  valid";
        break;

      case "password":
        if (!e.currentTarget.value.trim())
          return "password required";
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

    data[input.name] = input.value;
    this.setState({ user: data, errors: errors });

    // this.setState({ user: data,errors:errors });
  };

  handleEnableDesable = async (n1) => {
    const tokenStr = localStorage.getItem("token")
    if (n1.isDisabled === 0 || n1.isDisabled === null) {
      await http.post(apiUrl.apiEnd + "/EDmodservice", { mod_id: n1.id, isDisabled: 1 }, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    } else {
      await http.post(apiUrl.apiEnd + "/EDmodservice", { mod_id: n1.id, isDisabled: 0 }, { headers: { "Authorization": `Bearer ${tokenStr}` } })
    }
    const data1 = await http.get(apiUrl.apiEnd + "/getalluserdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
   
    this.setState({ usersData: data1.data.result, usersData1: data1.data.result, page: data1.data.result.length })
  }

  
  // handleDelete=async(n1)=>{
  //   const tokenStr = localStorage.getItem("token")
  // const sts =  await http.post(apiUrl.apiEnd+"/deletemod",{mod_id:n1.id},{ headers: { "Authorization": `Bearer ${tokenStr}` } })
  //      const data1 = await http.get(apiUrl.apiEnd+"/getalluserdata",{ headers: { "Authorization": `Bearer ${tokenStr}` } })
  //      this.setState({usersData:data1.data.result,page:data1.data.result.length})
  // }
  handlebutton = (n) => {
    this.setState({ currentPage: n })
  }
  handleEdit = (n1) => {
    this.setState({ user: n1, view: 2 })
  }
  handlechange1 = (e) => {
    const { currentTarget: input } = e
    this.setState({ serachText: input.value })
  }
  handleSubmit2 = () => {
    const data = [...this.state.usersData1]
    const user1 = auth.getCurrentUser();


    const filterData = data.filter(n1 => n1.username == this.state.serachText)
    //console.log(filterData)
    this.setState({ usersData: filterData, serachText: "" })


  }
  handleBack = async () => {
    const tokenStr = localStorage.getItem("token")
    const data1 = await http.get(apiUrl.apiEnd + "/getalluserdata", { headers: { "Authorization": `Bearer ${tokenStr}` } })
    
    this.setState({ usersData: data1.data.result, usersData1: data1.data.result, view: 1, page: data1.data.result.length })
  }
  handleSubmit1 = () => {
    const data = [...this.state.usersData1]
    this.setState({ usersData: data, serachText: "" })
  }
  render() 
  {
    
    
    
    // const toggleDetails = (index) => {
    //   const position = this.state.details.indexOf(index)
    //   let newDetails = this.state.details.slice()
    //   if (position !== -1) {
    //     newDetails.splice(position, 1)
    //   } else {
    //     newDetails = [...this.state.details, index]
    //   }
    //   this.setState({details:newDetails})
    // }
    
    const fields = [
      { key: 'username' },
      {key:'email'},
      {key:'created_at'},
      { key: 'role_id',label:'Role'},
      { key: 'isOnline', label:'Status' },
      { key: 'enable/disable'},
      { key: 'edit'},
      // {
      //   key: 'show_details',
      //   label: '',
      //   _style: { width: '1%' },
      //   sorter: false,
      //   filter: false
      // }
    ]
    
  

    const getBadge = isOnline => {
      switch (isOnline) {
        case 1: return 'success'
        case 0: return 'danger'
        case null: return 'danger'
        default: return 'primary'
      }
    }
    
    
    const { currentPage, pageSize, user, page, errors } = this.state;
    //  this.state.usersData.length
    //console.log(Math.ceil(page/10))
    let data = paginate(this.state.usersData, currentPage, pageSize)
    // console.log(data)
    return (
      <>
        {this.state.view === 1 ?
          <>
          <CCol style={{textAlign:'right'}} md="12">
          <CDropdown >
              <CDropdownToggle size="lg" color="info">
               Export
              </CDropdownToggle>
              <CDropdownMenu
                placement="bottom"
                modifiers={[{name: 'flip', enabled: false }]}
              >
               
                <CDropdownItem onClick={this.ExportToExcel}>XLS</CDropdownItem>
                {/* <CDropdownItem>Another Action</CDropdownItem> */}
              </CDropdownMenu>
            </CDropdown>

          </CCol>

<CDataTable
      items={this.state.usersData}
      fields={fields}
      // columnFilter
      tableFilter
      footer
      itemsPerPageSelect
      itemsPerPage={10}
      hover
      sorter
      pagination
      scopedSlots = {{
        'status':
          (item)=>(
            <td>
              <CBadge color={getBadge(item.status)}>
                {item.status}
              </CBadge>
            </td>
          ),
        'enable/disable':
          (item, index)=>{
            return (
              <td className="py-2">
                <CSwitch className={'mx-1'} variant={'3d'} value={item} color={'primary'} checked={item.isDisabled === 0 || item.isDisabled === null ? false : true} onClick={() => { this.handleEnableDesable(item) }} /> 
              </td>
              )
          },
          'role_id':
          (item, index)=>{
            return (
              <td className="py-2">
               {item.role_id == 1 ? "Medley" : item.role_id == 2 ? "Meest" : "Admin"}
              </td>
              )
          },
          'isOnline':
          (item, index)=>{
            return (
              <td className="py-2">
               <CBadge color={getBadge(item.isOnline)}>{item.isOnline === 0 || item.isOnline === null ? "Offline" : "online"} </CBadge>
           </td>
              )
          },
          'created_at':
          (item, index)=>{
            return (
              <td className="py-2">
               {item.id === 21 || item.id === 57 ? null : new Intl.DateTimeFormat('en-IN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(item.created_at))}
              </td>
              )
          },
          'edit':
          (item, index)=>{
            return (
              <td className="py-2">
               <CButton active block color="success" aria-pressed="true" onClick={() => { this.handleEdit(item) }}>Edit</CButton>
               </td>
              )
          }
           }}
    />

          </> :
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
                   <CLabel htmlFor="exampleInputName2" className="pr-1">Email</CLabel>
                   <CInput value={user.email} name="email" onChange={this.handlechange} type="email" placeholder="Email" autoComplete="email" required />
                   {errors.email ? (
                       <CFormText color="danger" className="help-block">{errors.email}</CFormText>
                      ) : (
                        ""
                      )}
                 </CFormGroup>
                 </CCol>
                 {/* <CCol> */}
                 {/* <CFormGroup className="pr-1">
                   <CLabel htmlFor="exampleInputEmail2" className="pr-1">Role name</CLabel>
                   <CSelect custom id="role_name" name="role_name" value={user.role_name} onChange={this.handlechange}>
                        <option value="0">Please select role name</option>
                          <option value="Agent">Agent</option>
                         <option value="Medly">Medly</option>
                       </CSelect>
                       {errors.role_name ? (
                       <CFormText color="danger" className="help-block">{errors.role_name}</CFormText>
                      ) : (
                        ""
                      )}
                 </CFormGroup>
                 </CCol> */}
                 </CRow>
                 <CRow>
                 {/* <CCol>
                 <CFormGroup className="pr-1">
                   <CLabel htmlFor="exampleInputName2" className="pr-1">Email</CLabel>
                   <CInput value={user.email} name="email" onChange={this.handlechange} type="email" placeholder="Email" autoComplete="email" required />
                   {errors.email ? (
                       <CFormText color="danger" className="help-block">{errors.email}</CFormText>
                      ) : (
                        ""
                      )}
                 </CFormGroup>
                 </CCol> */}
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
                
                 </CRow>
               </CForm>
             </CCardBody>
             <CCardFooter>
               <CButton type="submit" size="sm" color="success"  onClick={this.handleSubmit} className="mr-2"  disabled={this.isFormInvalid()}><CIcon name="cil-scrubber"  /> Update Moderator</CButton>
               <CButton type="reset" size="sm" color="info" onClick={this.handleBack}><CIcon name="cil-ban" /> Back to list</CButton>
             </CCardFooter>
           </CCard>
       </CCol>
        }
      </>
    )
  }
}

export default ManageModerator
