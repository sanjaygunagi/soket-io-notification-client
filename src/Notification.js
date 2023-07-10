import React, { useEffect, useRef, useState } from "react";
import { Dialog, keyframes } from "@mui/material";
import OrderNotification from "./OrderNotification";
// import newOrderNotifySound from "../../assets/audio/notificationRingtone.mp3";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

const slideInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(99%);
  }
`;

const Notification = ({ data }) => {
  //   const { subscriberId } = JSON.parse(
  //     JSON.stringify(useSelector((state) => state.auth))
  //   );
  return <OrderNotificationDialogue data={data} />;
};

const OrderNotificationDialogue = ({ data }) => {
  //   const dispatch = useDispatch();
  const [openOrderNotify, setOpenOrderNotify] = useState(false);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(null);
  const requestMode = "LIVE";

  const handleOpenOrderNotify = () => {
    setOpenOrderNotify(true);
    setIsPlaying(true);
    // audioRef.current.play();
  };

  const handleStop = () => {
    // audioRef.current.pause();
    // audioRef.current.currentTime = 0;
    setIsPlaying(false);
    // markAllNotificationsAsRead();
  };
  //   const { unseenCount, markAllNotificationsAsRead } = useNotifications();

  useEffect(() => {
    // if (unseenCount > 0) {
    //   dispatch(
    //     getAllOrders(pageNo, pageSize, searchText, selectedStatus, requestMode)
    //   );
    handleOpenOrderNotify();
    // }
  }, []);

  return (
    <>
      <div>
        {/* <audio ref={audioRef} src={newOrderNotifySound} loop /> */}
        <Dialog
          open={openOrderNotify}
          onClose={null}
          sx={{
            "& .MuiDialog-paper": {
              borderRadius: "8px",
              opacity: 1,
              transform: "translate(50px)",
              animation: `${slideInRight} 100ms ease-in-out`,
              transformOrigin: "right bottom",
              position: "absolute",
              bottom: "10px",
              right: "50px",
            },
          }}
          aria-labelledby="my-custom-dialog-title"
          aria-describedby="my-custom-dialog-description"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <OrderNotification
              setOpenOrderNotify={setOpenOrderNotify}
              handleStop={handleStop}
              data={data}
            />
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default Notification;
