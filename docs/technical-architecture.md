# Arquitectura Técnica Propuesta

## Estilo
Arquitectura hexagonal ligera + capas modulares:
- **UI (Screens/Components)**: flujo y UX.
- **Application (hooks/use cases)**: orquestación de OCR, validaciones y guardado.
- **Domain (types/validation rules)**: entidades y reglas de negocio.
- **Infrastructure (OCR adapters, storage repositories)**: implementación concreta.

## Decisiones clave
- React Native + Expo + TypeScript para velocidad de delivery.
- Android-first UI de alto contraste.
- `AsyncStorage` en MVP para almacenamiento local.
- Servicio OCR abstraído por interfaz para cambiar de proveedor (ML Kit, Vision API, AWS Textract, etc.).
- Repositorio local desacoplado de API para futura sincronización.

## Flujo principal
1. Captura unidad -> OCR unidad -> lookup historial local.
2. Captura odómetro -> OCR mileage.
3. Revisión manual (obligatoria si baja confianza).
4. Validación de reglas.
5. Guardado de registro + URIs de fotos originales.

## Evolución futura
- Agregar cola de sync (outbox pattern).
- Versión online con API REST/GraphQL.
- OCR on-device para menor latencia y privacidad.
