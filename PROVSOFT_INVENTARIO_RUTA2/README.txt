PROVSOFT - INVENTARIO RUTA 2

Ruta configurada:
/almacenes/Almacen_Ruta_2/tomafisica/INV120926/USUARIOS

La app lee TODOS los documentos dentro de USUARIOS y la subcoleccion PARTIDAS de cada usuario.
Cruza cada partida contra /productos por ID, codigo, productoId, codigoBarra y codigosEquivalentes[].

Muestra: codigo, concepto, cantidad, costo, IVA, IEPS, total sin impuestos y total con impuestos.
Los NO ENCONTRADOS parpadean en rojo.
Abajo muestra articulos SIN COSTO o NO ENCONTRADOS.

Ejecucion local:
Doble clic en EJECUTAR_INVENTARIO_RUTA2.bat
