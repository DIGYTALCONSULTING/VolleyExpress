import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const publicDir = path.resolve(root, "public");
const dataDir = path.resolve(root, "src", "data");

const catalogFiles = [
  "productos.json",
  "accesorios.json",
  "peluches.json",
  "productos.normalizado.json",
  "accesorios.normalizado.json",
  "peluches.normalizado.json",
  "catalog.index.json",
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function isExternalUrl(value) {
  return /^(https?:)?\/\//i.test(value) || /^data:/i.test(value) || /^blob:/i.test(value);
}

function pathExistsWithExactCase(baseDir, relativePath) {
  const parts = relativePath.split("/").filter(Boolean);
  let current = baseDir;

  for (const part of parts) {
    if (!fs.existsSync(current)) return false;

    const entries = fs.readdirSync(current);
    if (!entries.includes(part)) return false;

    current = path.join(current, part);
  }

  return fs.existsSync(current);
}

const missing = [];

for (const file of catalogFiles) {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) continue;

  const items = readJson(filePath);
  if (!Array.isArray(items)) continue;

  for (const item of items) {
    const imagen = item.imagen || item.img;
    if (!imagen || isExternalUrl(imagen)) continue;

    const relativePath = String(imagen).replace(/^\/+/, "");
    if (!pathExistsWithExactCase(publicDir, relativePath)) {
      missing.push({
        file,
        item: item.referencia || item.nombre || item.id || "Sin referencia",
        imagen,
      });
    }
  }
}

if (missing.length > 0) {
  console.error("Catalog assets missing or with case mismatch:");
  for (const entry of missing) {
    console.error(`- ${entry.file} | ${entry.item} | ${entry.imagen}`);
  }
  process.exit(1);
}

console.log("Catalog assets OK.");
