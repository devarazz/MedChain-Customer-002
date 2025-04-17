
import React from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, KeyboardIcon } from "lucide-react";
import Logo from "../components/Logo";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fade-in">
        <div className="mb-8">
          <Logo size="large" />
        </div>
        
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Product Verification
        </h2>
        
        <p className="text-center text-gray-600 mb-12 max-w-md">
          Verify the authenticity of your medication by scanning the QR code or entering the batch ID.
        </p>
        
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => navigate("/scan")}
            className="flex items-center justify-center gap-2 bg-medchain-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-medchain-dark transition-colors"
          >
            <QrCode size={24} />
            <span>Scan QR Code</span>
          </button>
          
          <button
            onClick={() => navigate("/manual")}
            className="flex items-center justify-center gap-2 bg-white text-medchain-primary py-3 px-6 rounded-lg font-semibold border border-medchain-primary hover:bg-medchain-secondary transition-colors"
          >
            <KeyboardIcon size={24} />
            <span>Enter Batch ID</span>
          </button>
        </div>
      </div>
      
      <footer className="text-center p-4 text-sm text-gray-500">
        © 2025 MedChain. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
