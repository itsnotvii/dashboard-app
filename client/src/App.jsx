import { useState, useEffect } from 'react'

function App() {
  const [shifts, setShifts] = useState([])
  const [assignments, setAssignments] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/shifts')
    .then(res => res.json())
    .then(data => setShifts(data))

    fetch('http://localhost:3001/assignments')
    .then(res => res.json())
    .then(data => setAssignments(data))
  }, []) 

  return (
    <div>
      <h1>My Dashboard</h1> 

      <h2>Upcoming Assignments</h2>
      {assignments.map(a => (
        <div key={a.id}>
          <h2>{a.title}</h2>
          <p>{a.course}</p>
          <p>Due: {a.due_at}</p>
        </div>
      ))}

      <h2>Work Shifts</h2>
      {shifts.map(s => (
        <div key={s.id}>
          <h2>{s.title}</h2>
          <p>{s.location}</p>
          <p>Start: {s.shift_start}</p>
        </div>
      ))}
    </div>
  )
}

export default App