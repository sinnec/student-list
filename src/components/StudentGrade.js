import React from 'react'

const StudentGrade = ({ testNumber, grade }) => {

  return (
    <li >Test {testNumber}: <span className='grade-percentage'>{grade}%</span></li>
  )
}

export default StudentGrade