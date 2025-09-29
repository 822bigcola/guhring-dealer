import React from "react";
import "../Loading/loading.css";

class LoadingPage extends React.Component {
  render() {
    return (
      <div className="loading-overlay">
        <div className="loading-content text-center">
          <div className="custom-spinner mb-4"></div>
          <h4 className="fw-bold text-white">Loading data, please wait...</h4>
        </div>
      </div>
    );
  }
}

export default LoadingPage;
