PROVSOFT INVENTARIO BODEGA 41 - 24 SEP 2026

LECTURA FIRESTORE (solo lectura):
Partidas: TIENDAS/BOD41/INVENTARIOS/inv240926/USUARIOS/{usuarioId}/PARTIDAS/{partidaId}
Catalogo: TIENDAS/BOD41/CATALOGOPRODUCTOS/{codigoBarra}

Se consultan todos los documentos de USUARIOS y sus PARTIDAS, y todos los productos del catalogo propio de BOD41.
Costo y tasas de impuestos se toman del catalogo, si existen esos campos.
Si los productos no tienen campos IVA/IEPS, el programa calcula tasa cero; NO se debe interpretar como clasificacion fiscal validada.
El filtro activo no se aplica, para conservar el comportamiento del original.

Ejecutar EJECUTAR_INVENTARIO_BODEGA41_24092026.bat.
Se conserva assets/firebase.js original sin introducir credenciales nuevas.
No se han comprobado lecturas reales ni conteos en el proyecto BOD41.
