import React, { useState }from 'react'
import StudentGrade from './StudentGrade'
import TextField from './TextField'

const Student = ( { student, students, setStudents }) => {

    const [expandClicked, setExpandStatus] = useState(false)
    const [newTag, setNewTag] = useState('')

    const handleTagChange = (event) => {
        setNewTag(event.target.value)
    }

    //Function after tag form is submitted, addes the submitted tag to tags list property of each student object
    const addTag = (event) => {
        event.preventDefault()
        const taggedStudent = { ...student, tags: student.tags.concat([newTag]) }
        setStudents(students.map(entry => entry.id !== student.id ? entry : taggedStudent))
        setNewTag('')
    }


    return (
        <li className='student-list-element'>
            <div className="photo-container">
                <img src={student.pic} alt={`${student.firstName} ${student.lastName}`}></img>
            </div>
            <div className='student-container'>
                <div className='student-name'><strong>{student.firstName} {student.lastName}</strong></div>
                <div className='student-details'>
                    <div>Email: {student.email}</div>
                    <div>Company: {student.company}</div>
                    <div>Skill: {student.skill}</div>
                    <div>Average: {student.averageGrade}%</div>
                    <ul className='grades-list'>
                        {expandClicked ? student.grades.map((grade, index) =><StudentGrade key={index + 1} testNumber={index + 1} grade={grade} />) : ""}
                    </ul>
                    <ul className='tag-list'>
                    {
                        student.tags
                        ? student.tags.map((tag, index) => <li className='tag-list-element' key={index}>{tag}</li>)
                        : <div></div>
                    }
                    </ul>
                    <form onSubmit={addTag}>
                        <TextField className='tag-input' placeholder='Add tag' value={newTag} onChange={handleTagChange} />
                    </form>
                </div>
            </div>
            <div className='button-container'>
                <button className='expand-button' onClick={() => setExpandStatus(expandClicked => !expandClicked)}>{expandClicked ? '-' : '+'}</button>
            </div>
        </li>
    )
}

export default Student