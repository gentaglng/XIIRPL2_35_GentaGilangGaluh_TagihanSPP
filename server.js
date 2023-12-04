const express = require('express')
const app = express()
const port = 3000
const connectDB = require ('./config/db')
const tagihanRouter = require('./router/tagihan')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(tagihanRouter)
connectDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})