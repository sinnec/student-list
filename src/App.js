import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import Student from './components/Student'
import TextField from './components/TextField'

const App = () => {
  const [ students, setStudents] = useState([])
  const [ nameFilter, setNameFilter ] = useState('')
  const [ tagFilter, setTagFilter ] = useState('')


  //Retrieves data from API and adds "gradeAverage" and "tags" property which is and empty list
  const studentsHook = () => {
    axios
      .get('https://api.hatchways.io/assessment/students')
      .then(response => {
          const edittedStudents = response.data.students.map(student => (
            { ...student,
              averageGrade: (student.grades.reduce((a, b) => Number(a) + Number(b), 0)) / student.grades.length,
              tags: []
            }))
        setStudents(edittedStudents)
      })
      .catch(error => console.log(error.response.data.error))
  }

  useEffect(studentsHook, [])

  //Handlers for changes in search fields
  const handleFilterNameChange = (event) => {
    setNameFilter(event.target.value)
  }

  const handleFilterTagChange = (event) => {
    console.log("pressed")
    setTagFilter(event.target.value)
  }


  //Functions for filtering "students" object array
  const filterByName = (object, filter) => {
    return [object.firstName, object.lastName].join(' ').toLowerCase().includes(filter.toLowerCase())
  }

  const filterByTag = (object, filter) => {
    return object.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  }

  //Ternary for the students array that will be shown with or without search terms
  const studentsToShow = (!nameFilter && !tagFilter)
    ? students
    : (nameFilter && !tagFilter)
    ? students.filter(student => filterByName(student, nameFilter))
    : (!nameFilter && tagFilter)
    ? students.filter(student => filterByTag(student, tagFilter))
    : students.filter(student => filterByName(student, nameFilter) && filterByTag(student, tagFilter))

  return (
    <>
      <TextField className='search' placeholder='Search by name' value={nameFilter} onChange={handleFilterNameChange} />
      <TextField className='search' placeholder='Search by tag' value={tagFilter} onChange={handleFilterTagChange} />
      <ul className='student-list'>
        {
          studentsToShow.length > 0
          && studentsToShow.map(student => <Student key={student.id} student={student} students={students} setStudents={setStudents} />)
        }
      </ul>
    </>
  )
}

export default App;