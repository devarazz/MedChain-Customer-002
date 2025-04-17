
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { verifyBatch } from "../services/batchService";
import { toast } from "sonner";

const Manual: React.FC = () => {
  const navigate = useNavigate();
  const [batchId, setBatchId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!batchId.trim()) {
      toast.error("Please enter a batch ID");
      return;
    }
    
    try {
      setIsVerifying(true);
      
      // Process the manually entered batch ID
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Enter Batch ID</h2>
          
          {isVerifying ? (
            <div className="py-6">
              <Loader message="Verifying product..." />
            </div>
          ) : (
            <form onSubmit={handleVerify} className="w-full">
              <div className="mb-6">
                <label htmlFor="batchId" className="block text-sm font-medium text-gray-700 mb-1">
                  Batch ID
                </label>
                <input
                  type="text"
                  id="batchId"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  placeholder="e.g. BATCH-YJ9E1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-medchain-primary focus:border-medchain-primary transition-colors"
                />
                <p className="mt-2 text-sm text-gray-500">
                  The batch ID can be found on the product packaging or documentation.
                </p>
              </div>
              
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-medchain-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-medchain-dark transition-colors"
              >
                <Search size={20} />
                <span>Verify Product</span>
              </button>
            </form>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Can't find the batch ID? Try scanning the QR code instead.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Manual;
