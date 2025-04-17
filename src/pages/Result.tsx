
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertTriangle, Download, QrCode } from "lucide-react";
import Header from "../components/Header";
import { VerificationResult } from "../types/Batch";
import { toast } from "sonner";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verificationResult, batchId } = location.state as { 
    verificationResult: VerificationResult; 
    batchId: string;
  };

  // Handle if no verification result is available
  if (!verificationResult) {
    navigate("/");
    return null;
  }

  const { success, batch, message } = verificationResult;

  const downloadCertificate = () => {
    toast.success("Certificate download started");
    // In a real app, this would generate and download a certificate
    setTimeout(() => {
      toast.info("This is a demo. No actual certificate will be downloaded.");
    }, 1500);
  };

  const scanAnother = () => {
    navigate("/scan");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col p-4 pb-24 animate-fade-in">
        {success && batch ? (
          <>
            {/* Verification Badge */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-3">
                <CheckCircle size={32} className="text-medchain-success" />
              </div>
              <h2 className="text-xl font-semibold text-center mb-1">Verified Product</h2>
              <p className="text-center text-gray-600">
                This product has been authenticated on the blockchain.
              </p>
            </div>
            
            {/* Batch Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Product Information</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Medicine Name</span>
                  <span className="font-semibold">{batch.medicineName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Batch ID</span>
                  <span className="font-semibold">{batch.id}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Manufacturing Date</span>
                  <span className="font-semibold">{batch.manufacturingDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expiry Date</span>
                  <span className="font-semibold">{batch.expiryDate}</span>
                </div>
              </div>
            </div>
            
            {/* Blockchain Information */}
            {batch.blockchainData && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">Blockchain Verification</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Transaction Hash</span>
                    <span className="font-mono text-sm truncate max-w-[180px]">
                      {batch.blockchainData.transactionHash}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Block Height</span>
                    <span className="font-semibold">{batch.blockchainData.blockHeight}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Consensus</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {batch.blockchainData.consensus}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Smart Contract</span>
                    <span className="font-semibold">{batch.blockchainData.smartContract}</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Supply Chain Journey */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Batch Journey</h3>
              
              <div className="space-y-8 relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                
                {batch.journey.map((participant, index) => (
                  <div key={`${participant.role}-${index}`} className="flex items-start relative pl-12">
                    {/* Timeline dot with icon */}
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-medchain-secondary flex items-center justify-center z-10">
                      {participant.verified ? (
                        <CheckCircle size={18} className="text-medchain-success" />
                      ) : (
                        <AlertTriangle size={18} className="text-medchain-warning" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-medchain-dark">{participant.role}</h4>
                        {participant.verified && (
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            Verified
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-700 text-sm mb-1">{participant.company}</p>
                      <p className="text-gray-500 text-xs">Signed by {participant.name} on {participant.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Download Certificate Button */}
            <button
              onClick={downloadCertificate}
              className="flex items-center justify-center gap-2 bg-medchain-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-medchain-dark transition-colors mb-4 w-full"
            >
              <Download size={20} />
              <span>Download Blockchain Certificate</span>
            </button>
          </>
        ) : (
          /* Error / Not Found */
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-3">
              <XCircle size={32} className="text-medchain-error" />
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-2">Invalid or Unverified Product</h2>
            
            <p className="text-center text-gray-600 mb-6 max-w-md">
              {message || "The product could not be verified. It may be counterfeit or the batch ID may be incorrect."}
            </p>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-700 mb-8 max-w-md">
              <p className="font-semibold mb-2 flex items-center">
                <AlertTriangle size={16} className="text-medchain-warning mr-2" />
                Warning
              </p>
              <p>
                Unverified products may be counterfeit and potentially harmful. 
                Please contact the manufacturer or retailer for further assistance.
              </p>
            </div>
            
            <p className="text-center text-gray-600 mb-2">
              Batch ID: <span className="font-mono">{batchId}</span>
            </p>
          </div>
        )}
        
        {/* Scan Another Button */}
        <button
          onClick={scanAnother}
          className="flex items-center justify-center gap-2 bg-white border border-medchain-primary text-medchain-primary py-3 px-6 rounded-lg font-semibold hover:bg-medchain-secondary transition-colors"
        >
          <QrCode size={20} />
          <span>Scan Another Product</span>
        </button>
      </main>
    </div>
  );
};

export default Result;
