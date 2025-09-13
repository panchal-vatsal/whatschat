const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const httpServer = createServer((req: any, res: any) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const io = new Server(httpServer)

  io.on('connection', (socket: any) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })

    socket.on('chat message', (msg: any) => {
      io.emit('chat message', msg)
    })

    socket.on('typing', (data: any) => {
      socket.broadcast.emit('typing', data);
    });
  
    socket.on('stop typing', () => {
      socket.broadcast.emit('stop typing');
    });
  })

  httpServer.listen(3000, (err: any) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
