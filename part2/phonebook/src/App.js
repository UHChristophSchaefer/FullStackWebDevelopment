import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm.js'
import Persons from './components/Persons.js'
import Notification from './components/Notification'

import personsService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // get persons from server
  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = nameFilter === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(nameFilter.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    // filter list with the current entered name
    if(newName === ''){
       // no name entered
       window.alert(`No name entered.`);
    } 
    else if(persons.filter(p => p.name === newName).length > 0){
      // name already exist
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          // user clicked 'ok' => user wants to replace the number
          const person = persons.find(p => p.name === newName)
          const changedPerson = { ...person, number: newNumber }
          
          personsService
            .update(changedPerson.id, changedPerson)
            .then(returnedPerson => {         
              // edit the list of persons with the updated user 
              setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
              setMessageType('error')
              setMessage(
                `Number of ${changedPerson.name} successfully updated`
              )
              setTimeout(() => {
                setMessageType(null)
                setMessage(null)
              }, 5000)

              // reset the inputs
              setNewName('')
              setNewNumber('')
            })
            .catch(error => {            
              setMessageType('error')
              setMessage(
                `Information of ${person.name}' has already been removed from server`
              )
              setTimeout(() => {
                setMessageType(null)
                setMessage(null)
              }, 5000)
              setPersons(persons.filter(p => p.id !== person.id))
            })

      }      
    }
    else if(newNumber === ''){
      // no phone number entered
      window.alert(`No phone number entered.`);
    }
    else {
      // name does not exist, so add it to the list
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personsService
        .create(personObject)
        .then(returnedNote => {

          setMessage(
            `${personObject.name} successfully added to Phonebook.`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setPersons(persons.concat(returnedNote))     
          setNewName('')
          setNewNumber('')
        })
    }      
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setNameFilter(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`Delete ${person.name} ?`)){
  
      personsService
        .deletePerson(id).then(err => {
          if(err === 200) {// 200 == success

            // delete person also from local list
            setPersons(persons.filter(p => p.id !== id))

            setMessageType('info')
            setMessage(
              `${person.name} successfully deleted from Phonebook.`
            )
            setTimeout(() => {
              setMessageType(null)
              setMessage(null)

            }, 5000)
          }
        })
        .catch(error => {
          alert(
            `Failed to delete person '${person.name}' from server`
          )
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>

      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange}/>

      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons 
        persons={personsToShow} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App