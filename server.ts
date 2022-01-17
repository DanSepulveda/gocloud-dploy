const express = require('express')
import { Request, Response } from 'express'
const path = require('path')
import Router from './routes'
const cors = require('cors')
require('dotenv').config()

const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use('/api', Router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.join(__dirname + '/client/build/index.html'))
    })
}

const PORT = process.env.PORT || 4000

app.listen(`${PORT}`, () => console.log(`Server listening on port ${PORT}`))