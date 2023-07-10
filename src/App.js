import React, { useEffect } from "react";
import { io } from "socket.io-client";
import Notification from "./Notification";
const App = () => {
  const [time, setTime] = React.useState("fetching");
  const [message, setMessage] = React.useState([]);
  const [newData, setNewData] = React.useState([]);
  React.useEffect(() => {
    //WS
    // const socket = io("http://localhost:5002", { transports: ["websocket"] });

    const socket = io("http://localhost:5002");

    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("time", (data) => setTime(data));
    socket.on("test", (data) => setMessage((prev) => [...prev, data]));
    socket.on("disconnect", () => setTime("server disconnected"));

    return () => {
      setMessage([]);
      socket.disconnect();
    };
  }, []);

  const mapIt = (message) => {
    for (let i = 0; i < message?.length; i++) {
      if (message[i]?.id === message[i + 1]?.id) {
        const temp = message[i];
        message[i] = message[i + 1];
        message[i + 1] = temp;
      }
    }
    // console.log("latest", message);
    setNewData(message?.reverse());
  };

  useEffect(() => {
    mapIt(message);
  }, [message]);

  return (
    <div className="App">
      {time}

      {/* to bring cancelled to beginning of an array*/}

      {/*       {message
        .sort(function (x, y) {
          return x.message?.includes("cancelled")
            ? -1
            : y.message?.includes("cancelled")
            ? 1
            : 0;
        }) */}
      {newData?.map((elem) => {
        // console.log("elem", elem);

        return (
          <Notification data={elem} />
          /*           <h1
            // style={{ position: "fixed" }}
            key={elem?.id}
            id={elem?.id}
            onClick={(e) => {
              console.log(e);
              const newData = message?.filter((value) => {
                return value?.id !== e?.target?.id;
              });
              setMessage(newData);
            }}
          >
            {elem?.message}
          </h1> */
        );
      })}
    </div>
  );
};
export default App;
