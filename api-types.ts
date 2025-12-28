/**
 * NSW Planning Portal & Council API Type Definitions
 * 
 * These interfaces match the expected structure of real NSW Planning Portal APIs.
 * When ready to connect to live APIs, update the base URLs in api-service.ts
 */

// ============================================================================
// PLANNING CONTROLS API (Cumberland Council)
// ============================================================================

export interface PlanningControlsRequest {
  address: string;
  lotDp?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface PlanningControlsResponse {
  success: boolean;
  propertyId: string;
  address: string;
  council: string;
  zoning: {
    zone: string;
    zoneCode: string;
    description: string;
    permittedUses: string[];
    prohibitedUses: string[];
    requiresConsent: string[];
  };
  heightLimit: {
    meters: number;
    storeys: number;
    source: string; // e.g., "LEP 2021 cl 4.3"
  };
  fsr: {
    maximum: number;
    source: string;
  };
  setbacks: {
    front: { min: number; max?: number; source: string };
    rear: { min: number; source: string };
    side: { min: number; source: string };
  };
  landUsePermissions: {
    residential: boolean;
    commercial: boolean;
    industrial: boolean;
    mixedUse: boolean;
  };
  overlays: {
    heritage?: boolean;
    flood?: boolean;
    bushfire?: boolean;
    contamination?: boolean;
  };
  dcpControls: {
    deepSoilMin: number;
    canopyTreesMin: number;
    privateOpenSpaceMin: number;
    parkingSpaces: number;
  };
  retrievedAt: string;
}

// ============================================================================
// DA SUBMISSION API (NSW Planning Portal)
// ============================================================================

export interface DASubmissionRequest {
  applicationType: 'DA' | 'CDC' | 'Review' | 'Modification';
  applicant: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  property: {
    address: string;
    lotDp: string;
    zone: string;
  };
  development: {
    type: string;
    description: string;
    estimatedCost: number;
  };
  documents: {
    fileName: string;
    fileType: string;
    category: string;
    uploadedAt: string;
  }[];
  preValidation: {
    planningControlsChecked: boolean;
    documentsComplete: boolean;
    basixCertificateValid?: boolean;
  };
}

export interface DASubmissionResponse {
  success: boolean;
  applicationNumber: string; // e.g., "DA/2024/0123"
  submittedAt: string;
  council: string;
  receiptUrl: string;
  trackingUrl: string;
  estimatedDecisionDate: string;
  lodgementFee: number;
  paymentStatus: 'pending' | 'paid' | 'waived';
  message: string;
}

// ============================================================================
// DA STATUS TRACKING API (NSW Planning Portal)
// ============================================================================

export interface DAStatusRequest {
  applicationNumber: string;
}

export interface DAStatusResponse {
  success: boolean;
  applicationNumber: string;
  status: 'lodged' | 'under-assessment' | 'rfi-issued' | 'approved' | 'refused' | 'withdrawn';
  currentStage: string;
  lodgedDate: string;
  lastUpdated: string;
  daysInAssessment: number;
  statutoryDeadline: string;
  daysRemaining: number;
  assessor: {
    name: string;
    email: string;
    phone: string;
  };
  timeline: {
    date: string;
    event: string;
    description: string;
  }[];
  rfis: {
    id: string;
    issuedDate: string;
    dueDate: string;
    status: 'open' | 'responded' | 'overdue';
    requestedInfo: string;
    responseSubmitted?: string;
  }[];
  publicNotification: {
    startDate: string;
    endDate: string;
    submissions: number;
    objections: number;
  } | null;
}

// ============================================================================
// DA DECISION API (NSW Planning Portal)
// ============================================================================

export interface DADecisionResponse {
  success: boolean;
  applicationNumber: string;
  decision: 'approved' | 'refused' | 'withdrawn';
  decisionDate: string;
  consentNumber?: string;
  conditions: {
    id: string;
    category: 'pre-construction' | 'during-construction' | 'post-construction' | 'operational';
    condition: string;
    timing: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    completed: boolean;
  }[];
  refusalReasons?: string[];
  appealPeriodEnd?: string;
  consentPdfUrl?: string;
}

// ============================================================================
// DOCUMENT VALIDATION API
// ============================================================================

export interface DocumentValidationRequest {
  documents: {
    type: string;
    fileName: string;
    fileSize: number;
    checksum?: string;
  }[];
  developmentType: string;
}

export interface DocumentValidationResponse {
  success: boolean;
  completeness: number; // 0-100
  missingDocuments: string[];
  warnings: string[];
  validDocuments: {
    type: string;
    status: 'valid' | 'invalid' | 'warning';
    message: string;
  }[];
}

// ============================================================================
// BASIX CERTIFICATE VALIDATION API
// ============================================================================

export interface BasixValidationRequest {
  certificateNumber: string;
  address: string;
}

export interface BasixValidationResponse {
  success: boolean;
  valid: boolean;
  certificateNumber: string;
  issueDate: string;
  expiryDate: string;
  waterScore: number;
  thermalComfortScore: number;
  energyScore: number;
  address: string;
  message: string;
}

// ============================================================================
// CONSTRUCTION CERTIFICATE API
// ============================================================================

export interface CCApplicationRequest {
  daNumber: string;
  applicant: {
    name: string;
    email: string;
    phone: string;
  };
  principalCertifier: {
    name: string;
    accreditationNumber: string;
    company: string;
    email: string;
  };
  documents: {
    fileName: string;
    category: string;
  }[];
  conditionsAddressed: string[]; // IDs of DA conditions satisfied
}

export interface CCApplicationResponse {
  success: boolean;
  ccNumber: string;
  issuedDate: string;
  validUntil: string;
  inspectionSchedule: {
    stage: string;
    requiredAt: string;
    status: 'pending' | 'passed' | 'failed';
  }[];
  message: string;
}

// ============================================================================
// API ERROR RESPONSE
// ============================================================================

export interface APIError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
