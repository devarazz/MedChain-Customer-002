
import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScanSuccess: (data: string) => void;
  onScanError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScanSuccess, onScanError }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const qrScannerId = "qr-scanner";

  // Start scanner when component mounts
  useEffect(() => {
    let html5QrCode: Html5Qrcode;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode(qrScannerId);
        
        await html5QrCode.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
          },
          (decodedText) => {
            // On successful scan
            onScanSuccess(decodedText);
            html5QrCode.stop();
          },
          (errorMessage) => {
            // Continuous scanning, only show permanent errors
            if (errorMessage.includes("permission")) {
              setError("Camera permission denied. Please allow camera access.");
              onScanError && onScanError("Camera permission denied");
            }
          }
        );
        
        setIsStarted(true);
      } catch (err) {
        setError("Failed to start camera. Please try again or enter batch ID manually.");
        onScanError && onScanError("Camera initialization failed");
      }
    };

    startScanner();

    // Clean up when component unmounts
    return () => {
      if (html5QrCode && isStarted) {
        html5QrCode.stop().catch(error => console.error("Failed to stop scanner:", error));
      }
    };
  }, [onScanSuccess, onScanError]);

  return (
    <div className="w-full flex flex-col items-center">
      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="relative w-full max-w-sm">
        {/* Scanner container */}
        <div id={qrScannerId} className="w-full h-80 rounded-lg overflow-hidden"></div>
        
        {/* Overlay with scanning frame */}
        <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none flex items-center justify-center">
          <div className="border-2 border-medchain-primary w-56 h-56 rounded-lg flex items-center justify-center">
            <div className="w-48 h-48 border border-dashed border-white opacity-70"></div>
          </div>
        </div>
        
        {/* Scanning hint */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="bg-black bg-opacity-50 text-white p-2 rounded-full inline-block">
            Align QR code within the frame
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRScanner;
