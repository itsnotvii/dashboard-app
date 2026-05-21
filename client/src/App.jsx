import { use } from 'react'
import { useState, useEffect } from 'react'

function App() {
  const [shifts, setShifts] = useState([])
  const [assignments, setAssignments] = useState([])
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [shiftStart, setShiftStart] = useState('')
  const [shiftEnd, setShiftEnd] = useState('')
  const [weather, setWeather] = useState(null)
  const [deletedShift, setDeletedShift] = useState(null)
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/shifts`)
      .then(res => res.json())
      .then(data => setShifts(data))

    fetch(`${import.meta.env.VITE_API_URL}/assignments`)
      .then(res => res.json())
      .then(data => setAssignments(data))

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=37.3382&lon=-121.8863&units=imperial&appid=eb0729da9531a431060ec9069ee4a006`)
      .then(res => res.json())
      .then(data => {
      console.log('Weather data:', data)
      setWeather(data)
    })
  }, [])

  const addShift = () => {
    fetch(`${import.meta.env.VITE_API_URL}/shifts`, {
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

  const deleteShift = (id) => {
    const shiftToDelete = shifts.find(s => s.id === id)

    fetch(`${import.meta.env.VITE_API_URL}/shifts/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setShifts(shifts.filter(s => s.id !== id))
        setDeletedShift(shiftToDelete)
        setTimeout(() => setDeletedShift(null), 5000)
      })
  }

  const undoDelete = () => {
    const { id, created_at, ...shiftData } = deletedShift

    fetch(`${import.meta.env.VITE_API_URL}/shifts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(deletedShift)
    })
      .then(res => res.json())
      .then(data => {
        const newShifts = [...shifts, data[0]]
        newShifts.sort((a, b) => new Date(a.shift_start) - new Date(b.shift_start))
        setShifts(newShifts)
        setDeletedShift(null)
        
      })
  }

  const getWeekStats = () => {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

    const shiftsThisWeek = shifts.filter(s => new Date(s.shifts_start) > weekAgo)

    const hoursWorked = shiftsThisWeek.reduce((total, s) => {
      const start = new Date(s.shift_start)
      const end = new Date(s.shift_end)
      const hours = (end - start) / (1000 * 60 * 60)
      return total + hours
    }, 0)

    const nextDeadline = assignments.length > 0
      ? new Date(assignments[0].due_at).toLocaleDateString()
      : 'None'

    return { shiftsThisWeek: shiftsThisWeek.length, hoursWorked: Math.round(hoursWorked), nextDeadline }

  }

  const stats = getWeekStats()

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">My Dashboard</h1>
        <div className="text-right"> 
        <p className="text-gray-400">{new Date().toDateString()}</p>
        {weather && (
          <p className="text-gray-400 mt-1">
            {Math.round(weather.main.temp)}°F - {weather.weather[0].main}
          </p>
        )}
        </div>
      </div>

      {deletedShift && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p=4 mb-6 flex justify-between items-center">
          <span className="text-gray-300">Shift "{deletedShift.title}" was deleted</span>
          <button
            onClick={undoDelete}
            className="text-blue-400 hover:text-blue-300 underline font-semibold"
          >
            Undo
          </button>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg p-4 border border-blue-700">
          <p className="text-gray-400 text-sm">Total Assignments</p>
          <p className="text-3xl font-bold text-blue-300">{assignments.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-lg p-4 border border-green-700">
          <p className="text-gray-400 text-sm">Shifts This Week</p>
          <p className="text-3xl font-bold text-purple-300">{stats.shiftsThisWeek}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-purple-950 rounded-lg p-4 border border-purple-700">
            <p className="text-gray-400 text-sm">Hours Worked</p>
            <p className="text-3xl font-bold text-purple-300">{stats.hoursWorked}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-900 to-orange-950 rounded-lg p-4 border border-orange-700">
          <p className="text-gray-400 text-sm">Next Deadline</p>
          <p className="text-lg font-bold text-orange-300">{stats.nextDeadline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            Upcoming Assignments
          </h2>
          <div className="flex flex-col gap-3">
            {assignments.map(a => (
              <div key={a.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition-all">
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
              <div key={s.id} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-700 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="text-gray-400 text-sm">{s.location}</p>
                  <p className="text-green-300 text-sm mt-2">
                    {new Date(s.shift_start).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteShift(s.id)}
                  className="text-red-400 hover:text-red-300 text-sm font-semibold"
                >
                  Delete
                </button>
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