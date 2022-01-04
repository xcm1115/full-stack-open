import React from 'react'

const Filter = props => {
  const { filterValue, handleFilterValue } = props;

  return (
    <div>
      filter shown with <input value={filterValue} onChange={handleFilterValue} />
    </div>
  )
}

export default Filter;