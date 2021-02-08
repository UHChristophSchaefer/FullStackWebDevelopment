import React from 'react'

const Header = (props) => <h1>{props.course}</h1> 

const Total = (props) => <p><b>total of {props.count} exercises</b></p>

const Part = (props) => <p>{props.name} {props.exercises}</p>

const Content = props => (
  <>
    {props.parts.map(part => 
      <Part key={part.id}  name={part.name} exercises={part.exercises}/>
    )}
  </>
)

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content 
        parts={course.parts}
    /> 
    <Total count={course.parts.map(part => part.exercises).reduce((a, b) => a + b)} />
  </div>
)

export default Course