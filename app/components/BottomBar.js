// @flow

import React, { Component } from 'react'
import Radium from 'radium'

const defaultStyle = {
  base: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    padding: '0 15px',
    height: 80,
    backgroundColor: '#111415',
  },
}

type Props = {
  children: any
};

class BottomBar extends Component {
  props: Props;

  render() {
    return (
      <div style={[defaultStyle.base]}>
        {this.props.children}
      </div>
    )
  }
}

export default Radium(BottomBar)
