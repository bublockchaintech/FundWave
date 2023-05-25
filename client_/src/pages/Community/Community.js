import React from "react";
import { useParams } from "react-router-dom";

const Community = () => {
  const { contractAddress } = useParams();
  console.log(contractAddress);
  return (
    <div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
      <div>Community</div>
    </div>
  );
};

export default Community;
