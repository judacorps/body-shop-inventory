export type CaptureType = 'unit' | 'odometer';

export interface PhotoEvidence {
  id: string;
  uri: string;
  type: CaptureType;
  capturedAt: string;
}

export interface OcrResult {
  rawText: string;
  normalizedValue: string;
  confidence: number;
  provider: string;
}

export interface MileageRecord {
  id: string;
  unitId: string;
  mileage: number;
  recordedAt: string;
  unitPhotoUri: string;
  odometerPhotoUri: string;
  unitOcr: OcrResult;
  odometerOcr: OcrResult;
  manuallyCorrected: boolean;
}

export interface UnitSummary {
  unitId: string;
  lastMileage: number;
  lastRecordedAt: string;
}
