import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer((req, res) => {
  res.write("<h1>Hello</h1>");
  res.end();
});
const io = new Server(httpServer, {
  // pingInterval: 24 * 60 * 60 * 1000,
  //   pingTimeout: 3 * 24 * 60 * 60 * 1000,
  cors: {
    origin: process.env.FRONT_URL,
    credentials: true,
  },
});

let users = [];
let answers = [];

io.on("connection", (socket) => {
  // Student join response
  socket.on("join student", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    const found = users.some((el) => el.id === socket.id);
    if (!found) {
      users.push(user);
    }
    socket.join("student");
    io.to("instructor").emit("new user", users);
  });

  // Instructor join response
  socket.on("join instructor", () => {
    socket.join("instructor");
    io.to("instructor").emit("new user", users);
    io.to("instructor").emit("new answer", answers);
  });

  // Student send answer
  socket.on("send answer", (payload) => {
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
    io.to("instructor").emit("new answer", answers);
  });

  // Instuctor send question
  socket.on("send question", (payload) => {
    io.emit("new question", payload.question);
  });

  // Instructor set timer
  socket.on("set timer", (timer) => {
    io.emit("start timer", timer);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.id !== socket.id);
    answers = answers.filter((u) => u.id !== socket.id);
    io.to("instructor").emit("new user", users);
    io.to("instructor").emit("new answer", answers);
  });
});

httpServer.listen(process.env.PORT || 80, () =>
  console.log(`Server has started on port ${process.env.PORT}`)
);
