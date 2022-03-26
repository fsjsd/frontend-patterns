import React from 'react'

const ToolTip: React.FC<{ isVisible: boolean }> = ({ isVisible, children }) => {
  return (
    <div
      id="tooltip-light"
      role="tooltip"
      className={`${isVisible ? "" : "invisible"} inline-block absolute z-10 py-2 px-3 text-sm text-gray-800 bg-white rounded-lg border border-gray-200 shadow-sm tooltip`}
      style={{
        bottom: '50px'
      }}
    >
      {children}
    </div >
  )
}

export default ToolTip