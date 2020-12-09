const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000

app.use(cors())
app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`Plugin service running on http://localhost:${port}`)
})