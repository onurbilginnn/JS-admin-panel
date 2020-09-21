import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {
  const lng = localStorage.getItem('appLng');
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent lang={lng}/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
