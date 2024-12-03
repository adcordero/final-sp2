import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <ReactLoading
        type={"spinningBubbles"}
        color={"#3c5185"}
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loading;
