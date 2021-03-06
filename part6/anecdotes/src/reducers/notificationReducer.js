const notificationReducer = (state = "", action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.text
    case 'GET_NOTIFICATION':
      return state
    case 'REMOVE_NOTIFICATION':
        return ''  
    default:
      return state
  }
}

let timeoutID = null;

export const setNotification = (text, seconds) => {
  return async dispatch => {
    if(timeoutID !== null)
      window.clearTimeout(timeoutID);
    dispatch({
      type: 'SET_NOTIFICATION',
      text
    })
    timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
      timeoutID = null
    }, seconds * 1000);
  }
}

export const getNotification = () => {
  return async dispatch => {
    dispatch({
      type: 'GET_NOTIFICATION'
    })
  }
}

export default notificationReducer