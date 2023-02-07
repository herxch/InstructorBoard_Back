import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

app.use((req, res, next)=>{
  res.send('<h1>Hello!</h1>')
})
// const httpServer = createServer(app);
// const io = new Server(httpServer, {
  // pingInterval: 24 * 60 * 60 * 1000,
  //   pingTimeout: 3 * 24 * 60 * 60 * 1000,
//   cors: {
//     origin: process.env.FRONT_URL,
//     credentials: true,
//   },
// });

// let users = [];
// let answers = [];

// io.on('connection', (socket) => {
 
//   console.log('client connected')
 
  // Student join response
  // socket.on('join student', (username) => {
  //   const user = {
  //     username,
  //     id: socket.id,
  //   };
  //   const found = users.some((el) => el.id === socket.id);
  //   if (!found) {
  //     users.push(user);
  //   }
  //   socket.join('student');
  //   io.to('instructor').emit('new user', users);
  // });

  // // Instructor join response
  // socket.on('join instructor', () => {
  //   socket.join('instructor');
  //   io.to('instructor').emit('new user', users);
  //   io.to('instructor').emit('new answer', answers);
  // });

  // // Student send answer
  // socket.on('send answer', (payload) => {
  //   const answer = {
  //     ...payload,
  //     id: socket.id,
  //   };
  //   let found = false;
  //   answers.map((el) => {
  //     if (el.id === socket.id) {
  //       el.answer = payload.answer;
  //       found = true;
  //     }
  //   });
  //   if (!found) {
  //     answers.push(answer);
  //   }
  //   io.to('instructor').emit('new answer', answers);
  // });

  // // Instructor set timer
  // socket.on('set timer', (timer) => {
  //   io.emit('start timer', timer);
  // });

  // socket.on('disconnect', () => {
  //   users = users.filter((u) => u.id !== socket.id);
  //   answers = answers.filter((u) => u.id !== socket.id);
  //   io.to('instructor').emit('new user', users);
  //   io.to('instructor').emit('new answer', answers);
  // });
// });

app.listen(process.env.PORT || 8080, () =>
  console.log(`Server has started on port ${process.env.PORT}`)
);
