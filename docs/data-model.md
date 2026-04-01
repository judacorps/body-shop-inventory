# Data Model (MVP)

## Entity: MileageRecord
- `id: string`
- `unitId: string`
- `mileage: number`
- `recordedAt: ISO8601`
- `unitPhotoUri: string`
- `odometerPhotoUri: string`
- `unitOcr: { rawText, normalizedValue, confidence, provider }`
- `odometerOcr: { rawText, normalizedValue, confidence, provider }`
- `manuallyCorrected: boolean`

## Entity: UnitSummary (derivada)
- `unitId: string`
- `lastMileage: number`
- `lastRecordedAt: ISO8601`

## Persistencia
- Clave local única: `mileage_records_v1`
- Formato: arreglo JSON de `MileageRecord[]`
