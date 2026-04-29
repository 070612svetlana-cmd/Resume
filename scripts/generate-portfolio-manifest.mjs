import { promises as fs } from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const outputPath = path.join(rootDir, "assets", "portfolio-manifest.js");

const imageExt = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".bmp", ".svg"]);
const videoExt = new Set([".mp4", ".webm", ".mov", ".m4v", ".avi", ".mkv"]);
const documentExt = new Set([".pdf", ".doc", ".docx", ".txt", ".md", ".url", ".ppt", ".pptx"]);

const foldersConfig = [
  {
    folder: "Логотипы, паттерны, иконки, брендбуки и иллюстрации в едином стиле",
    shortName: "Логотипы и бренд",
    category: "design",
    toneClass: "folder-brand",
    chip: "BRAND"
  },
  {
    folder: "Нейровидение, ролики",
    shortName: "Нейровидео",
    category: "video",
    toneClass: "folder-video",
    chip: "VIDEO"
  },
  {
    folder: "Нейроилюстрации, изображения",
    shortName: "Нейроиллюстрации",
    category: "design",
    toneClass: "folder-art",
    chip: "ART"
  },
  {
    folder: "Разукрашки для детей",
    shortName: "Разукрашки",
    category: "kids",
    toneClass: "folder-kids",
    chip: "KIDS"
  },
  {
    folder: "Ретушь и восстановление старых фотографий",
    shortName: "Ретушь фото",
    category: "photo",
    toneClass: "folder-restore",
    chip: "RESTORE"
  },
  {
    folder: "Сайты Лендинги",
    shortName: "Сайты и лендинги",
    category: "web",
    toneClass: "folder-web",
    chip: "WEB"
  },
  {
    folder: "GPT-агенты и AI-боты",
    shortName: "GPT и AI-боты",
    category: "ai",
    toneClass: "folder-ai",
    chip: "AI"
  }
];

function detectFileType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (videoExt.has(ext)) {
    return "video";
  }
  if (imageExt.has(ext)) {
    return "image";
  }
  if (documentExt.has(ext)) {
    return "document";
  }
  return null;
}

async function safeReadDir(absFolderPath) {
  try {
    return await fs.readdir(absFolderPath, { withFileTypes: true });
  } catch {
    return [];
  }
}

function extractUrlFromShortcut(content) {
  const match = content.match(/^URL=(.+)$/im);
  return match ? match[1].trim() : "";
}

async function detectExternalUrl(absFolderPath, files) {
  const urlFile = files.find((file) => file.toLowerCase().endsWith(".url"));
  if (!urlFile) {
    return "";
  }
  try {
    const content = await fs.readFile(path.join(absFolderPath, urlFile), "utf8");
    return extractUrlFromShortcut(content);
  } catch {
    return "";
  }
}

async function buildEntry(config) {
  const absFolderPath = path.join(rootDir, config.folder);
  const dirEntries = await safeReadDir(absFolderPath);

  const allTypedFiles = dirEntries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((file) => Boolean(detectFileType(file)))
    .sort((a, b) => a.localeCompare(b, "ru"));

  const detectedType =
    allTypedFiles.some((file) => detectFileType(file) === "video")
      ? "video"
      : allTypedFiles.some((file) => detectFileType(file) === "image")
        ? "image"
        : "document";

  const files = allTypedFiles.filter((file) => detectFileType(file) === detectedType);
  const externalUrl = await detectExternalUrl(absFolderPath, allTypedFiles);

  return {
    ...config,
    type: detectedType,
    files,
    externalUrl
  };
}

async function main() {
  const manifest = [];
  for (const config of foldersConfig) {
    manifest.push(await buildEntry(config));
  }

  const generatedAt = new Date().toISOString();
  const source = `window.PORTFOLIO_MANIFEST = ${JSON.stringify(manifest, null, 2)};\nwindow.PORTFOLIO_MANIFEST_META = { generatedAt: "${generatedAt}" };\n`;

  await fs.writeFile(outputPath, source, "utf8");
  console.log(`Manifest generated: ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate manifest:", error);
  process.exitCode = 1;
});
