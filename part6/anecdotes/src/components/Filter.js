import React from 'react'
import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
  const applyFilter = (filter) => {

    props.setFilter(filter)
  }

  return (
    <div>
      filter: <input onChange={({ target }) => applyFilter(target.value)} name="filter" />
    </div>    
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)