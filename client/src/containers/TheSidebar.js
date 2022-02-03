import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import logo from "../assets/icons/logo.png"
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav';
import auth from "../views/prashant/services/authServices";
 const data = [{
  _tag: 'CSidebarNavItem',
  name: 'Dashboard',
  to: '/summary',
  icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
},
{
  _tag: 'CSidebarNavItem',
  name: 'Moderator Panel',
  to: '/moderator',
  icon:'cil-chart-pie'},
  {
    _tag: 'CSidebarNavItem',
    name: 'Hold List',
    to: '/moderatorHold',
    icon:'cil-list'},
    {
      _tag: 'CSidebarNavItem',
      name: 'Reject List',
      to: '/rejectlist',
      icon:'cil-list'},
{
  _tag: 'CSidebarNavItem',
  name: 'Logout',
  to: '/logout',
  icon:'cil-user'},

]
// ModeratorHold
const TheSidebar = () => {
  const dispatch = useDispatch()
  //const [user , setUser]=useState();

  // useEffect(()=>{
  //   const user=auth.getCurrentUser();
  //   setUser(user);
  // })
  const show = useSelector(state => state.sidebarShow)
  const user=auth.getCurrentUser();
 
  return (
    <CSidebar
      show={show}
      className="text-info"
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
       <CImg src={logo} alt="logo" className="col-lg-4 m-2 p-2 col-sm-4"></CImg>
      </CSidebarBrand>
      <CSidebarNav
      >
      
        <CCreateElement
          items={user===null ? null : user.role_name==="Agent" || user.role_name==="Medly" ? data : navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer  className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
