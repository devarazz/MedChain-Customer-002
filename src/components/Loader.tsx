
import React from "react";

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 w-16 h-16 border-4 border-medchain-secondary rounded-full"></div>
        <div className="absolute top-0 w-16 h-16 border-4 border-medchain-primary rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-lg text-medchain-dark animate-pulse">{message}</p>
    </div>
  );
};

export default Loader;
