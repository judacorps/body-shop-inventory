import { UnitSummary } from '../types/domain';

export const OCR_CONFIDENCE_THRESHOLD = 0.8;

export function normalizeUnitId(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, '');
}

export function parseMileage(value: string): number | null {
  const numeric = value.replace(/[^0-9]/g, '');
  if (!numeric) return null;

  const mileage = Number(numeric);
  if (!Number.isFinite(mileage) || mileage < 0) return null;
  return mileage;
}

export function shouldAskManualCorrection(confidence: number): boolean {
  return confidence < OCR_CONFIDENCE_THRESHOLD;
}

export function validateMileageAgainstHistory(newMileage: number, summary: UnitSummary | null): string | null {
  if (!summary) return null;

  if (newMileage < summary.lastMileage) {
    return `Advertencia: el mileage nuevo (${newMileage}) es menor al último registrado (${summary.lastMileage}).`;
  }

  return null;
}
