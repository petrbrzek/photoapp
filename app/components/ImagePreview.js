import React from 'react'

const ImagePreview = props => (
  <div
    style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    }}
  >
    <img src={props.src} />
  </div>
)

export default ImagePreview
