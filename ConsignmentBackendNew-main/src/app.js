const path = require('path')
const express = require('express')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('../src/routers/user-router')
const dashboardSlider = require('../src/routers/dashboard-slider-router')
const consignmentRouter = require('../src/routers/consignment-router')
var cors = require('cors')


const app = express()
app.use(cors()) // Use this after the variable declaration

app.use(express.json())
app.use(userRouter)
app.use(dashboardSlider)
app.use(consignmentRouter)


module.exports = app