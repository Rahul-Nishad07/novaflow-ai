const express = require("express");
const router = express.Router();
const fs = require("fs").promises; // Using Promise-based fs for non-blocking I/O
const path = require("path");
const upload = require("../middleware/upload");

const uploadsDir = path.join(__dirname, "../../uploads");

// =========================
// GET ALL FILES
// =========================
router.get("/files", async (req, res) => {
  try {
    // Read the directory safely
    const files = await fs.readdir(uploadsDir);

    // Resolve stats for all files concurrently
    const fileListWithStats = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(uploadsDir, file);
          const stats = await fs.stat(filePath);

          if (!stats.isFile()) return null; // Skip subdirectories

          return {
            fileName: file,
            fileUrl: `http://localhost:5000/uploads/${file}`,
            size: (stats.size / 1024 / 1024).toFixed(2) + " MB",
          };
        } catch (fileErr) {
          // If a specific file fails stat reading, skip it gracefully
          return null;
        }
      })
    );

    // Filter out null values from subdirectories or failed reads
    const filteredFiles = fileListWithStats.filter((file) => file !== null);

    res.json({
      success: true,
      files: filteredFiles,
    });
  } catch (error) {
    console.error("Error reading directory:", error);
    res.status(500).json({
      success: false,
      message: "Could not retrieve files",
    });
  }
});

// =========================
// UPLOAD SINGLE FILE
// =========================
router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  res.json({
    success: true,
    fileName: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
  });
});

// =========================
// UPLOAD MULTIPLE FILES
// =========================
router.post("/multiple", upload.array("files", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    res.json({
      success: true,
      files: req.files,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Multiple upload failed",
    });
  }
});

// =========================
// DELETE FILE
// =========================
router.delete("/delete/:fileName", async (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(uploadsDir, fileName);

  try {
    // Check if file exists asynchronously
    await fs.access(filePath);
    
    // Delete file asynchronously
    await fs.unlink(filePath);

    res.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    // If fs.access fails, it throws an error (ENOENT means file doesn't exist)
    if (error.code === "ENOENT") {
      return res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
    
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete file",
    });
  }
});

module.exports = router;