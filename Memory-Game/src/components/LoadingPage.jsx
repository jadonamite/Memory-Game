import React from "react";
import "./LoadingPage.css";

const LoadingPage = () => {
   return (
      <div className="loading-container">
         <div className="loading-content">
            <h2 className="loading-title">WELCOME</h2>
            <div className="pulsing-box text-white">Web3Nova</div>
            <div className="loading-footer">Built by Web3Nova</div>
         </div>
      </div>
   );
};

export default LoadingPage;
