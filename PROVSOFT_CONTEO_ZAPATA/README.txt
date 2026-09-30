PROVSOFT - CONTEO INVENTARIO ZAPATA

Ruta de partidas configurada:
/almacenes/almacen_zapata/Inventarios/ZAPATA090926/USUARIOS/CIERRE_090926_1224/PARTIDAS

Catálogo:
/productos/{documento}

IMPORTANTE:
1. Completa assets/firebase.js con apiKey, messagingSenderId y appId reales del proyecto INVENTARIOPV.
2. La ubicación Firestore nam5 no requiere un parámetro especial en firebase.js.
3. Ejecuta con servidor HTTP (no abras index.html como file://). Ejemplo: python -m http.server 8080
4. La página muestra código, concepto, cantidad, costo, IVA, IEPS y total.
5. Si los documentos de /productos usan un ID interno distinto al código (como 000000109291 para código 020013), habrá que consultar el catálogo por el campo `codigo`. Esa consulta puede requerir índice/reglas adecuadas. El archivo app.js deja señalado ese punto.
6. Fórmula actual de total: cantidad * costo * (1 + IVA% + IEPS%). Si tu catálogo ya guarda costo con impuestos incluidos, se ajusta la fórmula.

EJECUCION LOCAL
===============
1. Tener Python 3 instalado.
2. Dar doble clic en EJECUTAR_CONTEO_ZAPATA.bat.
3. El servidor inicia en http://127.0.0.1:8000/ y abre el navegador automaticamente.
4. Para detenerlo, cerrar la ventana del servidor o presionar Ctrl+C.

Tambien puede ejecutarse manualmente:
    python server.py

CAMBIO V3:
- El catálogo /productos se carga completo y se indexa localmente.
- Busca cada partida por ID de documento, codigo, productoId, codigoBarra y codigosEquivalentes.
- Usa costoSinImpuesto, ivaTasa e iepsTasa del catálogo.
- Total = cantidad * costoSinImpuesto * (1 + IVA + IEPS).
- La pantalla indica cuántos productos se resolvieron por código equivalente y cuántos no se localizaron.

V4 COSTOS + EQUIVALENTES + PROBLEMAS DE CATALOGO
- Cruza inventario contra /productos por ID documento, codigo, productoId, codigoBarra y codigosEquivalentes[].
- Usa costoSinImpuesto como costo unitario principal.
- Calcula IVA e IEPS en pesos sobre Cantidad x Costo.
- Muestra Total sin impuestos y Total con impuestos.
- Agrega al final Articulos con problemas de catalogo: SIN COSTO y NO ENCONTRADO.

V5: Las filas NO ENCONTRADO parpadean en rojo en la tabla principal para llamar la atención del auditor. Los artículos SIN COSTO permanecen resaltados sin parpadeo.
