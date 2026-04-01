import AsyncStorage from '@react-native-async-storage/async-storage';
import { MileageRecord, UnitSummary } from '../../types/domain';
import { STORAGE_KEYS } from '../storage/keys';

export class MileageRepository {
  async listRecords(): Promise<MileageRecord[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEYS.mileageRecords);
    if (!raw) return [];

    const records = JSON.parse(raw) as MileageRecord[];
    return records.sort((a, b) => b.recordedAt.localeCompare(a.recordedAt));
  }

  async saveRecord(record: MileageRecord): Promise<void> {
    const records = await this.listRecords();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEYS.mileageRecords, JSON.stringify(records));
  }

  async getUnitSummary(unitId: string): Promise<UnitSummary | null> {
    const records = await this.listRecords();
    const match = records.find((r) => r.unitId.toUpperCase() === unitId.toUpperCase());

    if (!match) return null;

    return {
      unitId: match.unitId,
      lastMileage: match.mileage,
      lastRecordedAt: match.recordedAt,
    };
  }
}

export const mileageRepository = new MileageRepository();
