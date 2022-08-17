// IMPORT module's
const http = require('http')
const express = require('express')
const cors = require('cors')
const socketIO = require('socket.io')

// USE module's
const app = express()
const port = process.env.PORT || 5000

app.use(cors()) // cors's used for INTERN communication between URL

let users = [{}]

// END POINTS start =============================================
app.get('/', (req, res) => {
  res.send('Hello')
})

// END POINTS end ===============================================

const server = http.createServer(app)

// create connection of socket.io *******************************

const io = socketIO(server)

// When io circuit connection is on -- then do this
io.on('connection', (socket) => {
  console.log('New Connection')

  // on means - data receive krna (front end se)
  socket.on('joined', ({ user }) => {
    users[socket.id] = user

    console.log(`${users[socket.id]} has joined!!`)

    // broadcast means -- jisme message kiya usko chhod kr sb pr message jaye
    socket.broadcast.emit('userjoined', {
      user: `${users[socket.id]}`,
      message: `${users[socket.id]} has joined!!`,
    })

    console.log(`${users[socket.id]} Welcome to the Chat Group!!`)

    // emit means - send data (front end pr)
    socket.emit('welcome', {
      user: `${users[socket.id]}`,
      message: `${users[socket.id]} Welcome to the Chat Group!!`,
    })
  })

  //
  socket.on('message', ({ id, message }) => {
    io.emit('sendMessage', {
      user: users[id],
      message,
      id,
    })
  })

  // emit means - send data (front end pr)
  socket.on('disconnect', () => {
    console.log(`${users[socket.id]} has left!!`)

    // broadcast means -- jisme message kiya usko chhod kr sb pr message jaye
    socket.broadcast.emit('leave', {
      user: `${users[socket.id]}`,
      message: `${users[socket.id]} has left!!`,
    })
  })
})

// create connection of socket.io *******************************

server.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
