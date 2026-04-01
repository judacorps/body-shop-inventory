import { OcrResult } from '../../types/domain';
import { OcrService } from './OcrService';

const randomConfidence = () => Number((0.65 + Math.random() * 0.34).toFixed(2));

export class MockOcrService implements OcrService {
  async extractUnitId(_imageUri: string): Promise<OcrResult> {
    const candidates = ['TRK-204', 'A17B', 'UNIT92', 'MEC-77'];
    const normalizedValue = candidates[Math.floor(Math.random() * candidates.length)];

    return {
      rawText: normalizedValue,
      normalizedValue,
      confidence: randomConfidence(),
      provider: 'mock-local',
    };
  }

  async extractMileage(_imageUri: string): Promise<OcrResult> {
    const mileage = `${Math.floor(20000 + Math.random() * 220000)}`;

    return {
      rawText: mileage,
      normalizedValue: mileage,
      confidence: randomConfidence(),
      provider: 'mock-local',
    };
  }
}
