import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {
  render() {
    return (
      <div
        className={'Field__сell' + (this.props.close ? '' : ' Field__cell_flipped') + (this.props.done ? ' Field__cell_done' : '')}
        onClick={() => {
          this.props.onClick()
        }}
      >
        <div className='Cell__front-side' style={this.props.close ? {} : { background: this.props.background}}></div>
        <div className='Cell__back-side' style={{ backgroundImage: 'url(react-back-logo.png)' }}></div>
      </div>
    )
  }
}

Cell.propTypes = {
  onClick: PropTypes.func,
  pair: PropTypes.number.isRequired,
  close: PropTypes.bool.isRequired,
  done: PropTypes.bool.isRequired,
  background: PropTypes.string.isRequired
}

export default Cell