import React, { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Notification from "./Notification";
const App = () => {
  const [time, setTime] = React.useState("fetching");
  const [message, setMessage] = React.useState([]);
  const [newData, setNewData] = React.useState();
  const [printList, setPrintList] = React.useState([]);
  const [list, setList] = React.useState([]);

  const divRef = useRef();

  // const [socket] = React.useState(() => io("http://localhost:5004"));

  const socket = useRef();

  const displayData = [];

  React.useEffect(() => {
    //WS
    // const socket = io("http://localhost:5002", { transports: ["websocket"] });

    // socket = io("http://localhost:5002");

    socket.current = io("http://localhost:5004", {
      transports: ["polling"],
      query: { hi: "hi" },
    });

    socket.current.emit("data", { id: "hue8723gruhqwur89" });

    socket.current.on("connect", () => console.log(socket.current.id));
    socket.current.on("connect_error", () => {
      setTimeout(() => socket.current.connect(), 5000);
    });
    // socket.current.on("time", (data) => setTime(data));
    socket.current.on("test", (data) => {
      // setPrintList((prev) => [...prev, window.print()])

      console.log("divRef", divRef);
      const para = document.createElement("p");
      para.innerText = data?.message;
      divRef.current.appendChild(para);
      displayData.unshift(<Notification data={data} socket={socket} />);
      setList(displayData);
      setMessage((prev) => [...prev, data]);
    });
    socket.current.on("disconnect", () => setTime("server disconnected"));

    return () => {
      setMessage([]);
      // socket.disconnect();

      // socket.current?.disconnect();
    };
  }, []);

  const mapIt = (message) => {
    /*     for (let i = 0; i < message?.length; i++) {
      if (
        message[i]?.id === message[i + 1]?.id &&
        message[i]?.message?.includes("order received") &&
        message[i + 1]?.message?.includes("order cancelled")
      ) {
        const temp = message[i];
        message[i] = message[i + 1];
        message[i + 1] = temp;
      }
    } */
    // console.log("latest", message);
    setNewData(message?.reverse());
  };

  useEffect(() => {
    mapIt(message);
  }, [message]);

  printList?.forEach((elem) => {
    return elem;
  });

  return (
    <div className="App">
      <div
        style={{ position: "absolute", bottom: "0", right: "0" }}
        ref={divRef}
      ></div>
      {time}

      {list?.map((v) => {
        return v;
      })}

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

        return console.log(elem);
        // <Notification data={elem} socket={socket} />
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
      })}
    </div>
  );
};
export default App;
