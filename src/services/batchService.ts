
import { Batch } from "../types/Batch";

// Simulated database of batches
const mockBatches: Record<string, Batch> = {
  "BATCH-YJ9E1": {
    id: "BATCH-YJ9E1",
    medicineName: "Paracetamol",
    manufacturingDate: "April 16th, 2025",
    expiryDate: "April 16th, 2027",
    isVerified: true,
    blockchainData: {
      transactionHash: "0x42415443482d...89e1",
      blockHeight: "755709",
      consensus: "Verified",
      smartContract: "MedChainTracker"
    },
    journey: [
      {
        name: "karkki",
        company: "Manufacturer Inc.",
        role: "Manufacturer",
        timestamp: "April 16th, 2025 11:11 AM",
        signature: "0x6b61726b6b69...",
        verified: true
      },
      {
        name: "Karkki",
        company: "Distributor Inc.",
        role: "Distributor",
        timestamp: "April 16th, 2025 11:17 AM",
        signature: "0x6b61726b6b69...",
        verified: true
      },
      {
        name: "karkki",
        company: "Wholesaler Inc.",
        role: "Wholesaler",
        timestamp: "April 16th, 2025 11:18 AM",
        signature: "0x6b61726b6b69...",
        verified: true
      },
      {
        name: "karkki",
        company: "Retailer Inc.",
        role: "Retailer",
        timestamp: "April 16th, 2025 11:23 AM",
        signature: "0x6b61726b6b69...",
        verified: true
      }
    ]
  },
  "BATCH001": {
    id: "BATCH001",
    medicineName: "Ibuprofen",
    manufacturingDate: "March 15th, 2025",
    expiryDate: "March 15th, 2027",
    isVerified: true,
    blockchainData: {
      transactionHash: "0x4241544348303031",
      blockHeight: "723456",
      consensus: "Verified",
      smartContract: "MedChainTracker"
    },
    journey: [
      {
        name: "John Doe",
        company: "PharmaCorp Inc.",
        role: "Manufacturer",
        timestamp: "March 15th, 2025 09:30 AM",
        signature: "0x6a6f686e646f65...",
        verified: true
      },
      {
        name: "Jane Smith",
        company: "MedDist Inc.",
        role: "Distributor",
        timestamp: "March 18th, 2025 10:15 AM",
        signature: "0x6a616e65736d697468...",
        verified: true
      },
      {
        name: "Alex Johnson",
        company: "HealthWholesale Inc.",
        role: "Wholesaler",
        timestamp: "March 22nd, 2025 11:45 AM",
        signature: "0x616c65786a...",
        verified: true
      },
      {
        name: "Sam Wilson",
        company: "MediMart Inc.",
        role: "Retailer",
        timestamp: "March 30th, 2025 02:20 PM",
        signature: "0x73616d77696c736f6e...",
        verified: true
      }
    ]
  }
};

// Function to simulate verification delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Verifies a batch by ID (QR code or manual input)
 */
// export const verifyBatch = async (batchId: string): Promise<VerificationResult> => {

//   // Simulate API delay
//   await delay(1500);
  
//   // Check if batch exists in our mock database
//   if (mockBatches[batchId]) {
//     return {
//       success: true,
//       batch: mockBatches[batchId]
//     };
//   }
  
//   // Return failure for non-existent batches
//   return {
//     success: false,
//     message: "Invalid or unverified product. The batch ID was not found in our system."
//   };
// };

// export const verifyBatch = async (batchId: string) => {
//   try {
//     // Make API call to the Express server
//     const response = await fetch(`https://1983-115-247-148-182.ngrok-free.app/verify-batch/${batchId}`);
    
//     if (!response.ok) {
//       // Parse error message if available
//       const errorData = await response.json().catch(() => null);
//       throw new Error(errorData?.error || 'Failed to verify batch: ${response.status}');
//     }
    
//     // Parse and return the batch data
//     const data = await response.json();
    
//     if (!data.success) {
//       throw new Error(data.error || "Verification failed");
//     }
    
//     return {
//       isVerified: true,
//       batch: data.batch,
//       message: "Product verification successful!"
//     };
//   } catch (error) {
//     console.error("API error during batch verification:", error);
//     return {
//       isVerified: false,
//       error: error instanceof Error ? error.message : "Unknown error during verification",
//       message: "Product verification failed!"
//     };
//   }
// };
// import axios from 'axios';

// export const verifyBatch = async (batchId: string): Promise<VerificationResult> => {
//   try {
//     // Make API call to the Express server using axios
//     const response = await axios.get(`http://localhost:8080/verify-batch/${batchId}`, {
//       headers: {
//         'Accept': 'application/json'
//       }
//     });
//     console.log("response: ",response)
//     // Axios automatically parses JSON responses
//     const data = response.data;
    
//     if (!data.success) {
//       console.log("Verification failed with data:", data);
//       return {
//         success: false,
//         message: data.message || "Invalid or unverified product. The batch ID was not found in our system."
//       };
//     }
    
//     return {
//       success: true,
//       batch: data.batch
//     };
//   } catch (error) {
//     console.error("API error during batch verification:", error);
    
//     // Axios error handling
//     if (axios.isAxiosError(error)) {
//       const errorMessage = error.response?.data?.message || 
//                           error.response?.data?.error ||
//                           `Request failed with status: ${error.response?.status || 'unknown'}`;
      
//       return {
//         success: false,
//         message: errorMessage
//       };
//     }
    
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : "Unknown error during verification"
//     };
//   }
// };

/**
 * Verifies a batch by ID (QR code or manual input)
 */
// export const verifyBatch = async (batchId: string): Promise<VerificationResult> => {
//   // Simulate API delay
//   await delay(1500);
  
//   // Check if batch exists in our mock database
//   if (mockBatches[batchId]) {
//     return {
//       success: true,
//       batch: mockBatches[batchId]
//     };
//   }
  
//   // Return failure for non-existent batches
//   return {
//     success: false,
//     message: "Invalid or unverified product. The batch ID was not found in our system."
//   };
// };


import { getDatabase, ref, get } from 'firebase/database';
import { initializeApp } from 'firebase/app';

// Define TypeScript interface for verification result
interface VerificationResult {
  success: boolean;
  message?: string;
  batch?: any;
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByYYFUMM-q5UhgGpurAXxN14i4VWSqeVw",
  authDomain: "medchain-3a22f.firebaseapp.com",
  projectId: "medchain-3a22f",
  storageBucket: "medchain-3a22f.firebasestorage.app",
  messagingSenderId: "454135776190",
  appId: "1:454135776190:web:2d3dd591891f56091aafef",
  measurementId: "G-BP9H6GTVJW",
  databaseURL: "https://medchain-3a22f-default-rtdb.firebaseio.com"
};

// Initialize Firebase (if not already initialized elsewhere)
// Note: In a real app, you might want to check if Firebase is already initialized
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const verifyBatch = async (batchId: string): Promise<VerificationResult> => {
  try {
    // Create a reference to the specific batch in the Realtime Database
    const batchRef = ref(database, `batches/${batchId}`);
    
    // Get the batch data
    const snapshot = await get(batchRef);
    
    // Check if the batch exists
    if (!snapshot.exists()) {
      console.log("Batch not found:", batchId);
      return {
        success: false,
        message: "Invalid or unverified product. The batch ID was not found in our system."
      };
    }
    
    // Get the batch data from the snapshot
    const batchData = snapshot.val();
    
    // Verify the batch has required properties
    if (!batchData.medicineName || !batchData.manufacturerName) {
      console.log("Incomplete batch data:", batchData);
      return {
        success: false,
        message: "Invalid batch data. This product cannot be verified."
      };
    }
    
    // Check if the batch is flagged as fake
    if (batchData.status === 'flagged') {
      return {
        success: false,
        message: `WARNING: This batch has been flagged as potentially fake. Reason: ${batchData.flagReason || 'Not specified'}`,
        batch: batchData
      };
    }
    
    // For verified batches, return success with the batch data
    console.log("batchdata: ",batchData)
    return {
      success: true,
      batch: batchData
    };
  } catch (error) {
    console.error("Error during batch verification:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error during verification"
    };
  }
};
