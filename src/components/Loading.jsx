import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
