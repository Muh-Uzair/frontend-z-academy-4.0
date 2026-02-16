import React from "react";
import { Spinner } from "./spinner";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner className="text-primary size-7" />
    </div>
  );
};

export default LoadingScreen;
