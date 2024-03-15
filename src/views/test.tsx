import { useEffect } from "react";
import io from "socket.io-client";
import { infoNotificationMsg } from "../components/toast";


function Test() {
  const runEvent = () => {
    const socket = io(import.meta.env.VITE_BASE_URL, { transports: ["websocket"] });
    console.log("ran 1st");
    socket.emit("new_user_login", { message: "User has Logged In" });
  };


  const runLocalEvent = () => {
    // toast.info("This is a local event", {
    //   position: toast.POSITION.TOP_CENTER,
    // });
    // alert('Das');
  };

  const socket = io(import.meta.env.VITE_BASE_URL, { transports: ["websocket"] });
  useEffect(() => {
  


    socket.on("connection", () => {
      console.log("Connected to Socket io");
    });


    socket.on("new_user_login", (data) => {
    //   toast.info(data.message, {
    //     position: toast.POSITION.TOP_CENTER,
    //   });
    infoNotificationMsg(data.message)
    });
  }, [socket]);


  return (
    <div className="App">
      <button onClick={() => runEvent()}>Click for real time events</button>
      <button onClick={() => runLocalEvent()}>Click for local events</button>
    </div>
  );
}


export default Test;