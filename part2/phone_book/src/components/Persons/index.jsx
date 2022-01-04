import React from 'react'
import './index.css'

const Persons = props => {
  const { persons, filterValue, deletePerson } = props;

  return (
    persons.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase())).map(item =>
      <div key={item.id} className="top-space">
        <span>{item.name}</span>
        <span className="left-space">{item.number}</span>
        <button className="left-space" onClick={deletePerson(item)}>delete</button>
      </div>
    )
  )
}

export default Persons;