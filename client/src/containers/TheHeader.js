import React   from 'react'
import { useSelector, useDispatch } from 'react-redux';
import auth from "../views/prashant/services/authServices"
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,

} from '@coreui/react'

// routes config
import routes from '../routes'



const TheHeader = () => {
  const dispatch = useDispatch()
  // const [user , setUser]=useState();

  // useEffect(()=>{
    const user=auth.getCurrentUser();
    // setUser(user);
  // })
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        {/* <CIcon name="logo" height="48" alt="Logo"/> */}
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          {user==null ? null : user.role_name==="Agent" || user.role_name==="Medly" ? (
            <CHeaderNavLink to="/summary">{ user.role_name} Panel</CHeaderNavLink>
          ):( 
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          )}
        </CHeaderNavItem>
       
       
      </CHeaderNav>

      <CHeaderNav className="px-3">
        {/* <TheHeaderDropdownNotif/> */}
        {/* <TheHeaderDropdownTasks/> */}
        {/* <TheHeaderDropdownMssg/> */}
        {/* <TheHeaderDropdown/> */}
        Welcome: {user.username}
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter 
          className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
          routes={routes} 
        />
          {/* <div className="d-md-down-none mfe-2 c-subheader-nav">
            <CLink className="c-subheader-nav-link"href="#">
              <CIcon name="cil-speech" alt="Settings" />
            </CLink>
            <CLink 
              className="c-subheader-nav-link" 
              aria-current="page" 
              to="/dashboard"
            > */}
              {/* <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
            </CLink>
            <CLink className="c-subheader-nav-link" href="#">
              <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings */}
            {/* </CLink>
          </div> */}
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
