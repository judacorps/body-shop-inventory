# body-shop-inventory

App móvil (React Native + Expo + TypeScript) para capturar número de unidad y mileage con OCR, validación humana y almacenamiento local.

## Ejecutar

```bash
npm install
npm run start
```

## Estructura

- `docs/`: PRD, historias, arquitectura, modelo de datos, wireframes, validaciones y roadmap.
- `src/screens`: pantallas funcionales del flujo.
- `src/services/ocr`: abstracción OCR + implementación mock.
- `src/services/repositories`: repositorio local (offline-first).
- `src/utils/validation.ts`: reglas de negocio.

## Nota
OCR está mockeado para MVP técnico. La abstracción permite reemplazo por proveedor real sin tocar UI.
