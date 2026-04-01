# PRD — Mileage Capture Assistant (Android-first)

## Objetivo
Reducir tiempo y errores en el registro de millas de vehículos en talleres, reemplazando captura manual por flujo asistido con cámara + OCR + validación humana.

## KPIs
- Tiempo promedio de registro < 25 segundos por vehículo.
- Error de transcripción < 1.5%.
- Tasa de corrección manual por baja confianza OCR < 25% en fase piloto.
- 100% de registros con evidencia fotográfica doble (unidad + odómetro).

## Alcance MVP
- Captura foto de unidad.
- Captura foto de odómetro.
- OCR automático en ambos pasos.
- Confirmación/corrección manual.
- Persistencia local offline-first.
- Historial por unidad con último mileage.
- Advertencia de decremento de mileage.

## Fuera de alcance (MVP)
- Integración real con EAM/Fleetwatch.
- Multi-tenant backend.
- Roles y permisos complejos.
- Firma digital.

## Requisitos no funcionales
- Operable con una mano.
- Botones grandes, alto contraste.
- Respuesta perceptible < 200 ms en navegación local.
- Funcional sin red.
- Evidencia inmutable (foto original sin sobrescritura).
