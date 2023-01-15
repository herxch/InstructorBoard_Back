import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: 'https://ib.herxch.com',
    credentials: true,
  },
});

let users = [];
let answers = [];

io.on('connection', (socket) => {
  socket.on('join student', (username) => {
    const user = {
      username,
      id: socket.id,
    };
    const found = users.some((el) => el.id === socket.id);
    if (!found) {
      users.push(user);
    }
    socket.join('student');
    io.to('instructor').emit('new user', users);
  });
  socket.on('join instructor', () => {
    socket.join('instructor');
    io.to('instructor').emit('new user', users);
    io.to('instructor').emit('new answer', answers);
  });
  socket.on('send answer', (payload) => {
    const answer = {
      ...payload,
      id: socket.id,
    };
    let found = false;
    answers.map((el) => {
      if (el.id === socket.id) {
        el.answer = payload.answer;
        found = true;
      }
    });
    if (!found) {
      answers.push(answer);
    }
    io.to('instructor').emit('new answer', answers);
  });
  socket.on('disconnect', () => {
    users = users.filter((u) => u.id !== socket.id);
    answers = answers.filter((u) => u.id !== socket.id);
    io.to('instructor').emit('new user', users);
    io.to('instructor').emit('new answer', answers);
  });
});

httpServer.listen(process.env.PORT || 8080, () =>
  console.log(`Server has started on port ${process.env.PORT}`)
);
