import {Server} from 'socket.io'

const handler = (req: any, res: any) => {
  if (!req.socket.server) {
    const io = new Server(res.socket.server)
    io.on("connect", (socket) => {
      socket.on("new-stream", () => {
        console.log("New stream");
        io.emit("New Stream!")
      });
    });
      io.on("disconnect", () => {
        console.log("Disconnected")
      })
  }
  res.end()
};

export { handler as GET, handler as POST };
