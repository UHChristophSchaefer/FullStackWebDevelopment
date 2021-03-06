import React from 'react'
import { getNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notification !== ''){
    return (
      <div style={style}>
        {props.notification}
      </div>
    )
  }
  return (
    <div>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  getNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notification)