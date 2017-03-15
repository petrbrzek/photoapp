import React from 'react'

const ImagePreview = props => (
  <div
    style={{
      position: 'fixed',
      zIndex: 2,
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      background: `#111 url(${props.src}) no-repeat center`,
      backgroundSize: 'contain',
    }}
    onClick={props.onRequestHide}
  />
)

export default ImagePreview
