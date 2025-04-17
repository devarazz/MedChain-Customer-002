
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyboardIcon } from "lucide-react";
import QRScanner from "../components/QRScanner";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { verifyBatch } from "../services/batchService";
import { toast } from "sonner";

const Scan: React.FC = () => {
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleScanSuccess = async (batchId: string) => {
    try {
      setIsVerifying(true);
      toast.info("QR code detected! Verifying...");
      
      // Process the scanned batch ID
      const result = await verifyBatch(batchId);
      
      // Navigate to results with the verification data
      navigate("/result", { 
        state: { 
          verificationResult: result,
          batchId 
        } 
      });
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("Failed to verify product. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleScanError = (error: string) => {
    console.error("Scan error:", error);
    toast.error("Scanner error. Try entering the batch ID manually.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Scan Product QR Code</h2>
          
          {isVerifying ? (
            <div className="py-6">
              <Loader message="Verifying product..." />
            </div>
          ) : (
            <QRScanner 
              onScanSuccess={handleScanSuccess} 
              onScanError={handleScanError} 
            />
          )}
        </div>
        
        <div className="text-center">
          <button
            onClick={() => navigate("/manual")}
            className="flex items-center justify-center gap-2 mx-auto bg-white py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <KeyboardIcon size={18} />
            <span>Enter Batch ID Manually</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Scan;
