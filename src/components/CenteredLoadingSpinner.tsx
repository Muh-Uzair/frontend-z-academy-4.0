import React from "react";
import LoadingSpinner from "./LoadingSpinner";

const CenteredLoadingSpinner = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};

export default CenteredLoadingSpinner;
