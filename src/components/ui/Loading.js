import React from "react";

const Loading = ({ inline }) => {
  return inline ? <span>Loading...</span> : <div>Loading...</div>;
};

export default Loading;
