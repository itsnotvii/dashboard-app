import { use } from 'react'
import { useState, useEffect } from 'react'

function App() {
  const [shifts, setShifts] = useState([])
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [shiftStart, setShiftStart] = useState('')
  const [shiftEnd, setShiftEnd] = useState('')

  useEffect(() => {
    fetch('${import.meta.env.VITE_API_URL}/shifts')
      .then(res => res.json())
      .then(data => setShifts(data))

    fetch('${import.meta.env.VITE_API_URL}/assignments')
      .then(res => res.json())
      .then(data => setAssignments(data))
  }, [])

  const addShift = () => {
    fetch('${import.meta.env.VITE_API_URL}/shifts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        location,
        shift_start: shiftStart,
        shift_end: shiftEnd
      })
    })
      .then(res => res.json())
      .then(data => setShifts([...shifts, data[0]]))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Dashboard</h1>
        <p className="text-white-400">{new Date().toDateString()}</p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Upcoming Assignments
          </h2>
          <div className="flex flex-col gap-3">
            {assignments.map(a => (
              <div key={a.id} className="bg-gray-800 rounded-xl p-4">
                <h3 className="font-semibold text-white">{a.title}</h3>
                <p className="text-gray-400 text-sm">{a.course}</p>
                <p className="text-red-500 text-sm mt-1">
                  Due: {new Date(a.due_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Work Shifts
          </h2>
          <div className="flex flex-col gap-3">
            {shifts.map(s => (
              <div key={s.id} className="bg-gray-800 rounded-xl p-4">
                <h3 className="font-semibold text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.location}</p>
                <p className="text-green-300 text-sm mt-1">
                  {new Date(s.shift_start).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 rounded-xl p-4 mt-4">
            <h3 className="font-semibold mb-3">Add Shift</h3>
            <input
              className="w-full bg-gray-700 rounded p-2 mb-2 text-white"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded p-2 mb-2 text-white"
              placeholder="Location"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded p-2 mb-2 text-white"
              type="datetime-local"
              value={shiftStart}
              onChange={e => setShiftStart(e.target.value)}
            />
            <input
              className="w-full bg-gray-700 rounded p-2 mb-2 text-white"
              type="datetime-local"
              value={shiftEnd}
              onChange={e => setShiftEnd(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 hover:bg-blue-500 rounded p-2 font-semibold mt-1"
              onClick={addShift}
            >
              Add Shift
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App