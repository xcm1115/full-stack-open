import React from 'react'
import './index.css'

const PersonForm = props => {
  const {
    newName,
    newNumber,
    handleNewNameChange,
    handleNewNumberChange,
    addPerson,
  } = props;

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <div className="top-space">
        number: <input value={newNumber} onChange={handleNewNumberChange} />
      </div>
      <div className="top-space">
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm;