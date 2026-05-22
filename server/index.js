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
        id: 1,
        title: 'Lab 3 - Linked Lists',
        course: 'CS146 Data Structures',
        due_at: '2026-05-19T23:59:00',
        points_possible: 100,
        score: null 
    },
    {
        id: 2,
        title: 'Cancer Research Essay',
        course: 'BIO10 Intro To Biology',
        due_at: '2026-05-14T23:59:00',
        points_possible: 250,
        score: null
    }, 
    {
        id: 3, 
        title: 'Final Exam Practice',
        course: 'ISE130 Engineering Statistics',
        due_at: '2026-05-20T23:59:00',
        points_possible: 50,
        score: null
    },
    {
        id: 4,
        title: 'Group Project - Mobile App',
        course: 'CS150 Software Engineering',
        due_at: '2026-05-18T23:59:00',
        points_possible: 200,
        score: null
    },
    {
        id: 5,
        title: 'Shakespeare Analysis Paper',
        course: 'ENG101 English Literature',
        due_at: '2026-05-17T23:59:00',
        points_possible: 150,
        score: null 
    }


]


// request the assingments data, in json structure
app.get('/assignments', (req, res) => {
    res.json(assignments)
})

// Load the specific const vars taken out, hold while loading in, request body
// as title, location, shiftstart, shiftend, and notes., add that data into
// supabase variable we created earlier, pull data from shifts, throw error
// if that data is not found, else, provide the given data 
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