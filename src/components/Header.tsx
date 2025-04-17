
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";
import { ArrowLeft } from "lucide-react";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
      {showBackButton ? (
        <button
          onClick={handleBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-medchain-primary" />
        </button>
      ) : (
        <div className="w-10"></div> {/* Placeholder for spacing */}
      )}
      
      <Logo size="medium" />
      
      <div className="w-10"></div> {/* Placeholder for spacing */}
    </header>
  );
};

export default Header;
