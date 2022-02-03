import React from 'react'
import CIcon from '@coreui/icons-react'

// import auth from "../../prashant/services/authServices";
// const user1=auth.getCurrentUser();

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: '',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Management']
  },
  
  {
    _tag: 'CSidebarNavItem',
    name: 'Manage Moderator',
    to: '/manage',
    icon:'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Create Moderator',
    to: '/newuser',
    icon: 'cil-user-follow',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Report',
    to: '/report',
    icon: 'cil-notes',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Meest Hold',
    to: '/hold',
    icon: 'cil-bookmark',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Medley Hold',
    to: '/medlyhold',
    icon: 'cil-bookmark',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Meest Reject',
    to: '/moderatorreject',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Medley Reject',
    to: '/medlyreject',
    icon: 'cil-list',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/logout',
    icon:'cil-user'}
     
 
]

export default _nav
