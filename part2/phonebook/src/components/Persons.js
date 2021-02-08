import React from 'react'

const Person  = ({ name, number, deletePerson }) => {
    return (
        <div>
            {name} {number}
            <button onClick={deletePerson}>delete</button>
        </div>        
    )
}

const Persons  = ({ persons, deletePerson }) => {
    return (
        <div>
            {persons.map((p, i) => 
                <Person
                    key={i}
                    name={p.name} 
                    number={p.number} 
                    deletePerson={() => deletePerson(p.id)}
                />
            )}
        </div>
    )
}

export default Persons