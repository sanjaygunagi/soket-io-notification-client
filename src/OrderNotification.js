import React from "react";
// import NotificationSvg from "../../assets/svgs/NotificationSvg";
// import BellLogoSvgDefault from "../../assets/svgs/BellLogoSvgDefault";
import "./orderNotification.scss";

const OrderNotification = (props) => {
  const { setOpenOrderNotify, handleStop, data, socket } = props;

  //   console.log("test in comp" + new Date(), data);

  const handleBtnClick = () => {
    handleStop();
    setOpenOrderNotify(false);
    socket?.current?.emit("checked", data);
    socket?.current?.on("checked", (message) => console.log(message));
  };
  return (
    <div className="order-notification__dialog-container">
      <div className="order-notification__bell-image">
        {/* <NotificationSvg /> */}
        {/* <BellLogoSvgDefault /> */}
      </div>
      <p className="order-notification__order-received">
        {/* New Order Received/Cancelled */}
        {data?.message}
        {data?.id}
      </p>
      <p className="order-notification__content">
        {/* Please check your live dashboard or order history for more details. */}
      </p>
      <button
        className="order-notification__button"
        onClick={() => handleBtnClick()}
      >
        Okay, thanks!
      </button>
    </div>
  );
};

export default OrderNotification;
