import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheHeader
} from './index'

const TheLayout = () => {

  return (
    <div className="c-app  c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body" style={{margin:"0px",padding:"0px"}}>
        <div style={{margin:-30,backgroundColor:"white"}}>
      <div style={{padding:50}}>
          <TheContent/>
          </div>
          </div>
        </div>
        {/* <TheFooter/> */}
      </div>
    </div>
  )
}

export default TheLayout
