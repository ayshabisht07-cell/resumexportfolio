const fs = require("fs");
const path = require("path");
const pdf = require("pdf-parse");
const extractResumeData = require("../gemini");

const uploadsDir = path.join(__dirname, "./uploads");

function getLatestPdf(folderPath) {
  const files = fs
    .readdirSync(folderPath)
    .filter(file => file.toLowerCase().endsWith(".pdf"))
    .map(file => {
      const filePath = path.join(folderPath, file);
      return { filePath, mtime: fs.statSync(filePath).mtime.getTime() };
    })
    .sort((a, b) => b.mtime - a.mtime);

  return files.length ? files[0].filePath : null;
}

const dataparsed = async () => {
  try {
    const latestPdfPath = getLatestPdf(uploadsDir);
    if (!latestPdfPath) return { success: false, message: "No PDF found" };

    const dataBuffer = fs.readFileSync(latestPdfPath);
    const data = await pdf(dataBuffer);

    // ✅ Wait for extractResumeData to finish and return result
    const result = await extractResumeData(data.text);

    return result; // so your route knows success/failure
  } catch (error) {
    return { success: false, message: "Parse failed", error: error.message };
  }
};

module.exports = dataparsed;
