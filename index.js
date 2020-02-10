require('dotenv').config()

const express = require('express')
const router = require('./router')

const app = express()
app.use(express.json())

require('./database')

app.use('/', router)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))