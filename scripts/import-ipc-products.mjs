// Mengubah public/docs/beckhoff-productfinder.xlsx menjadi src/content/ipc-products.json untuk halaman Solusi IPC.
// Jalankan ulang setiap kali file Excel diperbarui: npm run ipc:import
// Baris 1 = judul kolom, kolom A diabaikan, kolom yang seluruhnya kosong tidak ikut. Tanpa dependensi: xlsx dibaca
// langsung sebagai arsip zip berisi XML.
import { readFileSync, writeFileSync } from "node:fs";
import { inflateRawSync } from "node:zlib";

const SOURCE = "public/docs/beckhoff-productfinder.xlsx";
const TARGET = "src/content/ipc-products.json";

function readZip(buffer) {
  const eocd = buffer.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (eocd < 0) throw new Error(`${SOURCE} bukan file xlsx yang valid`);
  const count = buffer.readUInt16LE(eocd + 10);
  let offset = buffer.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let i = 0; i < count; i++) {
    const method = buffer.readUInt16LE(offset + 10);
    const size = buffer.readUInt32LE(offset + 20);
    const nameLength = buffer.readUInt16LE(offset + 28);
    const extraLength = buffer.readUInt16LE(offset + 30);
    const commentLength = buffer.readUInt16LE(offset + 32);
    const localHeader = buffer.readUInt32LE(offset + 42);
    const name = buffer.toString("utf8", offset + 46, offset + 46 + nameLength);
    const dataStart = localHeader + 30 + buffer.readUInt16LE(localHeader + 26) + buffer.readUInt16LE(localHeader + 28);
    const data = buffer.subarray(dataStart, dataStart + size);
    files.set(name, (method === 8 ? inflateRawSync(data) : data).toString("utf8"));
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return files;
}

const decode = (text) =>
  text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");

const textOf = (xml) => decode([...xml.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1]).join(""));

// "TwinCAT 3 platform level" -> "twincat3PlatformLevel"
const toKey = (label) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^[^a-z]+/, "");

const files = readZip(readFileSync(SOURCE));
const shared = [...(files.get("xl/sharedStrings.xml") ?? "").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => textOf(m[1]));

const grid = [...files.get("xl/worksheets/sheet1.xml").matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((row) => {
  const cells = {};
  for (const [, attrs, body] of row[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
    const col = attrs.match(/r="([A-Z]+)\d+"/)[1];
    const type = attrs.match(/t="(\w+)"/)?.[1];
    const value = body?.match(/<v>([\s\S]*?)<\/v>/)?.[1];
    if (type === "s" && value !== undefined) cells[col] = shared[Number(value)];
    else if (type === "inlineStr") cells[col] = textOf(body);
    else if (value !== undefined) cells[col] = decode(value);
  }
  return cells;
});

const [header, ...body] = grid;
const rows = body.filter((cells) => Object.values(cells).some((v) => v.trim()));
const columns = Object.entries(header)
  .filter(([col, label]) => col !== "A" && label.trim() && rows.some((cells) => cells[col]?.trim()))
  .map(([col, label]) => ({ col, key: toKey(label), label: label.trim() }));

const catalog = {
  columns: columns.map(({ key, label }) => ({ key, label })),
  rows: rows.map((cells) => Object.fromEntries(columns.map(({ col, key }) => [key, cells[col]?.trim() ?? ""]))),
};

writeFileSync(TARGET, `${JSON.stringify(catalog, null, 2)}\n`);
console.log(`${TARGET}: ${catalog.rows.length} produk, ${catalog.columns.length} kolom`);
