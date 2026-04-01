# Roadmap de Integraciones EAM / Fleetwatch

## Fase 1 — Fundaciones (actual)
- Modelo de dominio estable.
- OCR abstraction.
- Persistencia offline local.

## Fase 2 — Sync API
- Outbox local + reintentos exponenciales.
- Endpoints:
  - POST /mileage-records
  - GET /units/{unitId}/last-mileage
- Idempotencia por `record.id`.

## Fase 3 — Integración EAM/Fleetwatch
- Mapeo de `unitId` local vs `assetId` enterprise.
- Webhooks/event bus para actualización bidireccional.
- Reglas de reconciliación cuando haya conflictos de mileage.

## Fase 4 — Seguridad & Gobierno
- OAuth2 device flow.
- Cifrado en reposo para evidencia local.
- Auditoría central con hash de evidencia.

## Fase 5 — Inteligencia operacional
- Detección automática de anomalías de odómetro.
- Dashboard de calidad OCR por taller.
- Sugerencias de mantenimiento preventivo por uso.
