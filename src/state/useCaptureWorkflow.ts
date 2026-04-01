import { useState } from 'react';
import { mileageRepository } from '../services/repositories/MileageRepository';
import { ocrService } from '../services/ocr';
import { MileageRecord, UnitSummary } from '../types/domain';
import { normalizeUnitId, parseMileage, shouldAskManualCorrection, validateMileageAgainstHistory } from '../utils/validation';
import { v4 as uuidv4 } from 'uuid';

interface SaveInput {
  unitId: string;
  mileageText: string;
  unitPhotoUri: string;
  odometerPhotoUri: string;
  unitConfidence: number;
  mileageConfidence: number;
}

export function useCaptureWorkflow() {
  const [existingUnit, setExistingUnit] = useState<UnitSummary | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  async function detectUnit(uri: string) {
    const result = await ocrService.extractUnitId(uri);
    const normalized = normalizeUnitId(result.normalizedValue);
    const unitSummary = await mileageRepository.getUnitSummary(normalized);

    setExistingUnit(unitSummary);

    return {
      value: normalized,
      confidence: result.confidence,
      needsManualReview: shouldAskManualCorrection(result.confidence),
    };
  }

  async function detectMileage(uri: string) {
    const result = await ocrService.extractMileage(uri);
    return {
      value: result.normalizedValue,
      confidence: result.confidence,
      needsManualReview: shouldAskManualCorrection(result.confidence),
    };
  }

  async function saveRecord(input: SaveInput) {
    const unitId = normalizeUnitId(input.unitId);
    const mileage = parseMileage(input.mileageText);

    if (mileage === null) {
      throw new Error('Mileage inválido');
    }

    const summary = await mileageRepository.getUnitSummary(unitId);
    const mileageWarning = validateMileageAgainstHistory(mileage, summary);
    setWarning(mileageWarning);

    const now = new Date().toISOString();
    const record: MileageRecord = {
      id: uuidv4(),
      unitId,
      mileage,
      recordedAt: now,
      unitPhotoUri: input.unitPhotoUri,
      odometerPhotoUri: input.odometerPhotoUri,
      unitOcr: {
        rawText: input.unitId,
        normalizedValue: unitId,
        confidence: input.unitConfidence,
        provider: 'mock-local',
      },
      odometerOcr: {
        rawText: input.mileageText,
        normalizedValue: `${mileage}`,
        confidence: input.mileageConfidence,
        provider: 'mock-local',
      },
      manuallyCorrected: false,
    };

    await mileageRepository.saveRecord(record);
    setExistingUnit({ unitId, lastMileage: mileage, lastRecordedAt: now });

    return { record, mileageWarning };
  }

  return { existingUnit, warning, detectUnit, detectMileage, saveRecord };
}
