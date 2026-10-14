PROVSOFT INVENTARIO RIO VERDE - 17 SEP 2026

INVENTARIO (todos los usuarios y sus partidas):
TIENDAS/RIO VERDE/INVENTARIO/INVENTARIO170926/USUARIOS/{usuarioId}/PARTIDAS/{partidaId}

CATALOGO: coleccion global productos (igual que OSITO).

Lee todas las partidas y cruza por codigo, productoId, codigoBarra y codigosEquivalentes.
Calcula cantidad, costo, IVA, IEPS, total sin y con impuestos y exporta CSV.
Solo lectura: utiliza getDocs; no modifica Firestore.

EJECUCION: EJECUTAR_INVENTARIO_RIO_VERDE_17092026.bat
REQUISITOS: Python 3 y conexion a Internet.
NOTA: el archivo assets/firebase.js conserva exactamente la configuracion original del ZIP OSITO, incluidos los valores de ejemplo. Se requiere verificar la lectura real en el entorno destino. No se modificaron credenciales.
NOTA: servidor en 127.0.0.1:8000; cierre otros servidores locales que ocupen ese puerto.
