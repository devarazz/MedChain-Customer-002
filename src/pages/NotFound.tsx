
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { AlertCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-red-100 mb-4">
            <AlertCircle size={32} className="text-medchain-error" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">404</h1>
          <p className="text-xl text-gray-600 mb-6">Page not found</p>
          
          <button
            onClick={() => navigate("/")}
            className="bg-medchain-primary text-white py-2 px-6 rounded-lg font-semibold hover:bg-medchain-dark transition-colors"
          >
            Return to Home
          </button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
