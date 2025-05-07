import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, AlertTriangle, Download, QrCode } from "lucide-react";
import Header from "../components/Header";
import { toast } from "sonner";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { verificationResult, batchId } = location.state || {};

  // Handle if no verification result is available
  if (!verificationResult) {
    React.useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  }

  const { success, batch } = verificationResult;

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

  // Map signatures to journey format
  const journeyItems = batch?.signatures?.map(sig => ({
    role: sig.role.charAt(0).toUpperCase() + sig.role.slice(1), // Capitalize role
    company: sig.organizationName,
    name: sig.userName,
    timestamp: new Intl.DateTimeFormat('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    }).format(new Date(sig.timestamp)),
    verified: sig.isVerified
  })) || [];

  // Format dates for display
  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(dateString));
  };

  // Mock blockchain data based on real properties
  const blockchainData = batch ? {
    transactionHash: `0x${batch.id.split('-')[2]}f3a2...${batch.creator.substring(batch.creator.length - 6)}`,
    blockHeight: Math.floor(Math.random() * 1000000) + 15000000,
    consensus: "Validated",
    smartContract: "MedChain-V1"
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex flex-col p-4 pb-24">
        {success && batch ? (
          <>
            {/* Verification Badge */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 mb-3">
                <CheckCircle size={32} className="text-green-600" />
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
                  <span className="font-semibold">{formatDate(batch.manufacturingDate)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Expiry Date</span>
                  <span className="font-semibold">{formatDate(batch.expiryDate)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Manufacturer</span>
                  <span className="font-semibold">{batch.manufacturerName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quantity</span>
                  <span className="font-semibold">{batch.quantity} units</span>
                </div>
              </div>
            </div>
            
            {/* Blockchain Information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Blockchain Verification</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Transaction Hash</span>
                  <span className="font-mono text-sm truncate max-w-[180px]">
                    {blockchainData.transactionHash}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Block Height</span>
                  <span className="font-semibold">{blockchainData.blockHeight}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Consensus</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {blockchainData.consensus}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Smart Contract</span>
                  <span className="font-semibold">{blockchainData.smartContract}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Creator Address</span>
                  <span className="font-mono text-sm truncate max-w-[180px]">
                    {batch.creator}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Blockchain Status</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {batch.blockchainVerified ? "Verified" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Supply Chain Journey */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Supply Chain Journey</h3>
              
              <div className="space-y-8 relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[20px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
                
                {journeyItems.map((participant, index) => (
                  <div key={`${participant.role}-${index}`} className="flex items-start relative pl-12">
                    {/* Timeline dot with icon */}
                    <div className="absolute left-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center z-10">
                      {participant.verified ? (
                        <CheckCircle size={18} className="text-green-600" />
                      ) : (
                        <AlertTriangle size={18} className="text-yellow-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-gray-900">{participant.role}</h4>
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
              className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 w-full"
            >
              <Download size={20} />
              <span>Download Blockchain Certificate</span>
            </button>
          </>
        ) : (
          /* Error / Not Found */
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6 flex flex-col items-center">
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-3">
              <XCircle size={32} className="text-red-600" />
            </div>
            
            <h2 className="text-xl font-semibold text-center mb-2">Invalid or Unverified Product</h2>
            
            <p className="text-center text-gray-600 mb-6 max-w-md">
              The product could not be verified. It may be counterfeit or the batch ID may be incorrect.
            </p>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 text-sm text-gray-700 mb-8 max-w-md">
              <p className="font-semibold mb-2 flex items-center">
                <AlertTriangle size={16} className="text-yellow-600 mr-2" />
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
          className="flex items-center justify-center gap-2 bg-white border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          <QrCode size={20} />
          <span>Scan Another Product</span>
        </button>
      </main>
    </div>
  );
};

export default Result;