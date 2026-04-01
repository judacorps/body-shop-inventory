import { OcrResult } from '../../types/domain';

export interface OcrService {
  extractUnitId(imageUri: string): Promise<OcrResult>;
  extractMileage(imageUri: string): Promise<OcrResult>;
}
