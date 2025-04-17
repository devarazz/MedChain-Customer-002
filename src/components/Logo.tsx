
import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "text-xl",
    medium: "text-3xl",
    large: "text-5xl"
  };

  return (
    <div className="flex items-center justify-center">
      <h1 className={`font-bold ${sizeClasses[size]} text-medchain-primary`}>
        Med<span className="text-medchain-accent">Chain</span>
      </h1>
    </div>
  );
};

export default Logo;
