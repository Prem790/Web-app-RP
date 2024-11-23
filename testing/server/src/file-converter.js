const path = require("path");
const fs = require("fs");
const libre = require("libreoffice-convert");
const { promisify } = require("util");

const convertAsync = promisify(libre.convert);

const convertFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const inputPath = req.file.path;
    const originalName = path.parse(req.file.originalname).name; // Extract the original name without extension
    const outputPath = path.resolve("uploads", `${originalName}.pdf`); // Use absolute path for the output file

    const docxBuf = await fs.promises.readFile(inputPath);

    // Convert to PDF
    const pdfBuf = await convertAsync(docxBuf, ".pdf", undefined);

    // Save the PDF
    await fs.promises.writeFile(outputPath, pdfBuf);

    // Send the PDF file with the correct name
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${originalName}.pdf"`
    );
    res.sendFile(outputPath, (err) => {
      // Cleanup files after sending
      fs.unlink(inputPath, () => {});
      fs.unlink(outputPath, () => {});
    });
  } catch (error) {
    console.error("Conversion error:", error);
    res.status(500).send("Error converting file");
  }
};

const { getMetadata } = require("./metadata");




module.exports = { convertFile };
