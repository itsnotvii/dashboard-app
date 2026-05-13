const express = require('express')
const supabase = require('./db')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173'
}))

const assignments = [
    {
        title: 'Lab 3 - Linked Lists',
        course: 'CS146 Data Structures',
        due_at: '2026-05-19T23:59:00',
        points_possible: 100,
        score: null
    },
    {
        title: 'Cancer Research Essay',
        course: 'BIO10 Intro To Biology',
        due_at: '2026-05-14T23:59:00',
        points_possible: 250,
        score: null
    }, 
    {
        title: 'Final Exam Practice',
        course: 'ISE130 Engineering Statistics',
        due_at: '2026-05-20T23:59:00',
        points_possible: 50,
        score: null
    }
]

app.get('/assignments', (req, res) => {
    res.json(assignments)
})

app.post('/shifts', async(req, res) => {
    const { title, location, shift_start, shift_end, notes} = req.body

    const { data, error } = await supabase
    .from('shifts')
    .insert([{ title, location, shift_start, shift_end, notes }])
    .select()

    if (error) {
        res.status(500).json({ error: error.message })
    } else {
        res.status(201).json(data)
    }
})

app.get('/shifts', async (req, res) => {
    const { data, error } = await supabase
    .from('shifts')
    .select('*')

    if (error) {
        res.status(500).json({ error: error.message })
    } else {
        res.json(data)
    }
})

app.listen(3001, () => { 
    console.log('Server is running on port 3001')
})