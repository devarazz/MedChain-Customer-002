
import { Batch, VerificationResult } from "../types/Batch";

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
export const verifyBatch = async (batchId: string): Promise<VerificationResult> => {
  // Simulate API delay
  await delay(1500);
  
  // Check if batch exists in our mock database
  if (mockBatches[batchId]) {
    return {
      success: true,
      batch: mockBatches[batchId]
    };
  }
  
  // Return failure for non-existent batches
  return {
    success: false,
    message: "Invalid or unverified product. The batch ID was not found in our system."
  };
};
