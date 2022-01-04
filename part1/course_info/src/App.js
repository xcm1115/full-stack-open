import React, { Fragment } from "react";

const Header = props => {
  const { name } = props;

  return (
    <h1>{name}</h1>
  )
}

const Part = props => {
  const { name, exercises } = props.part;

  return (
    <p>{name} {exercises}</p>
  )
}

const Content = props => {
  const { parts } = props;

  return (
    <Fragment>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </Fragment>
  )
}

const Total = props => {
  return (
    <p>Number of exercises {props.totalExercises}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const totalExercises = course.parts.reduce((pre, cur) => pre += cur.exercises, 0);

  return (
    <Fragment>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={totalExercises} />
    </Fragment>
  )
}

export default App