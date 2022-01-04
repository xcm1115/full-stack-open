import React, { Fragment } from "react";

const Header = props => {
  const { text } = props;

  return (
    <h1>{text}</h1>
  )
}

const Content = props => {
  const { parts } = props;

  return (
    <Fragment>
      {
        parts.map(item => <Part key={item.id} part={item} />)
      }
    </Fragment>
  )
}

const Part = props => {
  const { part } = props;
  const { name, exercises } = part;

  return (
    <p>{name} {exercises}</p>
  )
}

const Total = props => {
  const { totalExercises } = props;

  return (
    <p><b>total of {totalExercises} exercises</b></p>
  )
}

const Course = props => {
  const { course } = props;
  const totalExercises = course.parts.reduce((pre, cur) => pre += cur.exercises, 0);

  return (
    <Fragment>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total totalExercises={totalExercises} />
    </Fragment>
  )
}

export default Course;