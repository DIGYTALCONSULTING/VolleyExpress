// scripts/normalize-catalog.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const dataDir = path.resolve(root, "src", "data");

const INPUTS = [
  { key: "productos", file: "productos.json" },
  { key: "accesorios", file: "accesorios.json" },
  { key: "peluches", file: "peluches.json" },
];

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8");
}

function stripAccents(s = "") {
  return String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeText(s = "") {
  return stripAccents(String(s))
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s/.,-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(s = "") {
  return normalizeText(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseCOP(value) {
  if (value == null) return null;
  const str = String(value);
  const digits = str.replace(/[^\d]/g, "");
  if (!digits) return null;
  const num = Number(digits);
  return Number.isFinite(num) ? num : null;
}

/** Normaliza “cadenas de catálogo” para filtros (sin tildes, mayúsculas controladas, sin ruido) */
function normFacet(s) {
  if (s == null) return null;
  const t = normalizeText(s);
  return t || null;
}

function normalizeUpperClean(s) {
  if (s == null) return null;
  const t = stripAccents(String(s))
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
  return t || null;
}

/** Corrige typos frecuentes (los tuyos reales) */
function fixTypos(s) {
  if (!s) return s;

  // Correcciones puntuales vistas en tus JSON
  return s
    .replace(/\bBLACO\b/gi, "BLANCO")
    .replace(/\bMUŃECA\b/gi, "MUÑECA")
    .replace(/\bMOŃO\b/gi, "MOÑO")
    .replace(/\bENTRENAMIEßNTO\b/gi, "ENTRENAMIENTO")
    .replace(/\s+_/g, "_")
    .replace(/_{2,}/g, "_")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/** Convierte talla a array normalizado:
 *  "S/M, M/L" => ["S/M","M/L"]
 *  "JR / ADULTO" => ["JR","ADULTO"]
 *  null => []
 */
function parseSizeList(sizeRaw) {
  if (sizeRaw == null) return [];
  const raw = fixTypos(String(sizeRaw));

  // separadores típicos: "," "/" " y "
  let parts = raw
    .split(/,|\by\b|&/i)
    .map(x => x.trim())
    .filter(Boolean);

  // si quedó algo como "JR / ADULTO" o "M / L"
  parts = parts.flatMap(p => p.split("/").map(x => x.trim()).filter(Boolean));

  // normalización ligera: S M L etc
  const out = [];
  for (const p of parts) {
    const cleaned = p.replace(/\s+/g, " ").trim().toUpperCase();

    // mantiene formatos tipo S/M, M/L, XS/S
    if (!cleaned) continue;

    // Normaliza “U (Universal)” a U
    if (/UNIVERSAL|\bU\b/i.test(cleaned)) {
      out.push("U");
      continue;
    }

    // Normaliza “JR” y “ADULTO”
    if (/^JR$/i.test(cleaned)) { out.push("JR"); continue; }
    if (/ADULTO/i.test(cleaned)) { out.push("ADULTO"); continue; }

    out.push(cleaned);
  }

  // únicos
  return Array.from(new Set(out));
}

/** Normaliza color a un formato estable para filtro */
function normalizeColor(colorRaw) {
  if (colorRaw == null) return null;
  let c = fixTypos(String(colorRaw));
  c = normalizeUpperClean(c);

  // normalizaciones simples (ej: “METALICO”)
  if (c === "METALICO") c = "METÁLICO";

  return c;
}

/** Detecta subcategoría “real” usando ruta de imagen + referencia */
function detectSubcategory({ categoria, imagen, referencia }) {
  const img = normalizeText(imagen || "");
  const ref = normalizeText(referencia || "");

  if (categoria === "peluches") return "peluches";
  if (categoria === "accesorios") return "accesorios";

  // categoria === productos: inferimos por ruta
  // tus rutas: /img/implementos/rodilleras/... , /img/implementos/balones/... , /img/implementos/otros/...
  if (img.includes("/implementos/rodilleras/") || ref.includes("rodillera")) return "rodilleras";
  if (img.includes("/implementos/balones/") || ref.includes("balon") || ref.includes("balón")) return "balones";
  if (img.includes("/implementos/otros/")) return "otros";

  // fallback por palabras
  if (/(aguja|inflador|cinta|kinesi|esparad|tobillera|mangas|medias|theraband|banda|estabilizador)/.test(ref)) return "otros";

  // si no reconoce, lo deja como “productos”
  return "productos";
}

function bestId({ categoria, subcategoria, referencia, imagen }) {
  const a = slugify(referencia || "item");
  const b = slugify(imagen || "").split("-").slice(0, 6).join("-");
  return `${categoria}:${subcategoria}:${a}${b ? `:${b}` : ""}`;
}

function buildSearchText(item) {
  const parts = [
    item.referencia,
    item.nombre,
    item.descripcion,
    item.color,
    item.size,
    item.material,
    item.uso,
    item.categoria,
    item.subcategoria,
    // contexto local SEO
    "medellin",
    "medellín",
    "colombia",
    "voleibol",
    "volleyball",
    // intent keywords (ayudan al match)
    "comprar",
    "precio",
    "envio",
    "envío",
    "whatsapp",
  ].filter(Boolean);

  return normalizeText(parts.join(" "));
}

function normalizeItem(raw, categoria) {
  const referenciaRaw = raw.referencia ?? raw.nombre ?? "Item";
  const referencia = fixTypos(String(referenciaRaw)).trim();

  const descripcion = fixTypos(raw.descripcion ?? "");
  const imagen = raw.imagen ?? raw.img ?? "";

  const precioTexto = raw.precio ?? "";
  const precioCOP = parseCOP(precioTexto);

  // Campos opcionales “crudos”
  const color = normalizeColor(raw.color ?? null);
  const size = raw.size ?? null;
  const material = fixTypos(raw.material ?? null);
  const uso = fixTypos(raw.uso ?? null);

  // subcategoria real
  const subcategoria = detectSubcategory({ categoria, imagen, referencia });

  // Normalizados para filtros (esto es lo que tu bot debe usar)
  const colorNorm = normFacet(color);                 // ej: "negro"
  const materialNorm = normFacet(material);           // ej: "acero"
  const sizeList = parseSizeList(size);               // ej: ["S/M","M/L"]
  const sizeNorm = sizeList.map(s => normFacet(s)).filter(Boolean); // ej: ["s/m","m/l"]

  const slug = slugify(referencia);
  const id = bestId({ categoria, subcategoria, referencia, imagen });

  const searchText = buildSearchText({
    referencia,
    nombre: raw.nombre,
    descripcion,
    color,
    size: Array.isArray(sizeList) && sizeList.length ? sizeList.join(", ") : (size ?? ""),
    material,
    uso,
    categoria,
    subcategoria,
  });

  return {
    id,
    categoria,       // productos | accesorios | peluches
    subcategoria,    // rodilleras | balones | otros | accesorios | peluches
    referencia,
    nombre: raw.nombre ?? null,
    descripcion,
    precioTexto,
    precioCOP,
    imagen,
    color,
    size: size ?? null,
    sizeList,        // NUEVO: array usable
    material: material ?? null,
    uso: uso ?? null,
    slug,
    // NUEVO: facetas normalizadas para filtros
    colorNorm,
    materialNorm,
    sizeNorm,        // array normalizado
    searchText,
  };
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error("❌ No existe src/data:", dataDir);
    process.exit(1);
  }

  const index = [];

  for (const src of INPUTS) {
    const inPath = path.resolve(dataDir, src.file);
    if (!fs.existsSync(inPath)) {
      console.error(`❌ No existe ${src.file} en src/data/`);
      process.exit(1);
    }

    const arr = readJson(inPath);
    if (!Array.isArray(arr)) {
      console.error(`❌ ${src.file} debe ser un array JSON`);
      process.exit(1);
    }

    const normalized = arr.map((x) => normalizeItem(x, src.key));

    const outPath = path.resolve(dataDir, `${src.key}.normalizado.json`);
    writeJson(outPath, normalized);
    console.log(`✅ Generado: src/data/${src.key}.normalizado.json (${normalized.length})`);

    // Índice para chatbot: lo esencial + facetas normalizadas
    for (const it of normalized) {
      index.push({
        id: it.id,
        categoria: it.categoria,
        subcategoria: it.subcategoria,
        referencia: it.referencia,
        descripcion: it.descripcion,
        precioTexto: it.precioTexto,
        precioCOP: it.precioCOP,
        imagen: it.imagen,
        color: it.color,
        size: it.size,
        sizeList: it.sizeList,
        material: it.material,
        uso: it.uso,
        slug: it.slug,
        colorNorm: it.colorNorm,
        materialNorm: it.materialNorm,
        sizeNorm: it.sizeNorm,
        searchText: it.searchText,
      });
    }
  }

  const indexPath = path.resolve(dataDir, "catalog.index.json");
  writeJson(indexPath, index);
  console.log(`✅ Generado: src/data/catalog.index.json (${index.length})`);
  console.log("✅ Listo.");
}

main();