# Validaciones de Negocio

1. **Unidad alfanumérica**
   - Normaliza a mayúsculas sin espacios.
2. **Mileage numérico positivo**
   - Se extraen dígitos y se rechaza vacío o negativo.
3. **Baja confianza OCR**
   - Umbral configurable `0.80`.
   - Mostrar aviso y requerir revisión visual.
4. **Unidad existente**
   - Mostrar último mileage conocido al detectar unidad.
5. **Mileage decreciente**
   - Si nuevo < anterior, mostrar advertencia de posible error/fraude.
6. **Evidencia obligatoria**
   - Registro no se persiste sin foto de unidad y odómetro.
