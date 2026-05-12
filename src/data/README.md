# Guia rapida del catalogo

Este proyecto muestra los productos desde archivos JSON en `src/data`.

## Donde editar productos

- Balones, rodilleras e implementos: `src/data/productos.json`
- Accesorios y variedades: `src/data/accesorios.json`
- Peluches: `src/data/peluches.json`

No edites primero los archivos `*.normalizado.json` ni `catalog.index.json`.
Esos se regeneran automaticamente con:

```bash
npm run normalize:catalog
```

## Donde poner imagenes

- Rodilleras: `public/img/implementos/rodilleras/`
- Balones: `public/img/implementos/balones/`
- Otros implementos: `public/img/implementos/otros/`
- Accesorios: `public/img/variedades/accesorios/`
- Peluches: `public/img/variedades/peluches/`

Si publicas desde la carpeta `docs`, copia tambien la misma imagen en la ruta equivalente dentro de `docs/img/...`.

## Formato recomendado

```json
{
  "referencia": "Rodilleras Nueva Marca",
  "descripcion": "Rodilleras de voleibol para entrenamiento y competencia.",
  "precio": "$150.000",
  "imagen": "/img/implementos/rodilleras/rodilleras_nueva_marca.webp",
  "color": "NEGRO",
  "size": "S/M, M/L",
  "material": "Nylon, goma y spandex",
  "uso": "Competencia / Entrenamiento"
}
```

## Despues de cambiar productos

1. Guarda el JSON fuente.
2. Ejecuta `npm run normalize:catalog`.
3. Ejecuta `npm run build` para verificar que la pagina compile.
