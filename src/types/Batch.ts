
export interface BatchParticipant {
  name: string;
  company: string;
  role: string;
  timestamp: string;
  signature: string;
  verified: boolean;
}

export interface Batch {
  id: string;
  medicineName: string;
  manufacturingDate: string;
  expiryDate: string;
  isVerified: boolean;
  blockchainData?: {
    transactionHash: string;
    blockHeight: string;
    consensus: string;
    smartContract: string;
  };
  journey: BatchParticipant[];
}

export interface VerificationResult {
  success: boolean;
  batch?: Batch;
  message?: string;
}
