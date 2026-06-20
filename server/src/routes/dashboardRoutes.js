const express = require("express");
const router = express.Router();
const fs = require("fs").promises; // Using promises version for non-blocking I/O
const path = require("path");

// Shared uploads path helper
const uploadsPath = path.join(__dirname, "../../uploads");

// 1. Get Dashboard Statistics
router.get("/stats", async (req, res) => {
  try {
    const files = await fs.readdir(uploadsPath);

    let pdfs = 0;
    let docx = 0;
    let excel = 0;
    let images = 0;
    let totalSize = 0;

    // Process file stats concurrently for better performance
    const statPromises = files.map(async (file) => {
      try {
        const stats = await fs.stat(path.join(uploadsPath, file));
        
        // Skip directories if any exist in the folder
        if (!stats.isFile()) return; 

        totalSize += stats.size;

        const ext = path.extname(file).toLowerCase();
        if (ext === ".pdf") pdfs++;
        else if (ext === ".docx") docx++;
        else if (ext === ".xls" || ext === ".xlsx") excel++;
        else if ([".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(ext)) images++;
      } catch (err) {
        // Log individual file error but don't crash the entire request
        console.error(`Error reading file ${file}:`, err);
      }
    });

    await Promise.all(statPromises);

    res.json({
      success: true,
      totalFiles: files.length,
      pdfs,
      docx,
      excel,
      images,
      storageUsed: (totalSize / 1024 / 1024).toFixed(2), // MB
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Dashboard Stats Failed",
    });
  }
});

// 2. Get Recent Uploads (Added missing 'async' keyword)
router.get("/recent-uploads", async (req, res) => {
  try {
    const files = await fs.readdir(uploadsPath);

    // Resolve stats for all files concurrently
    const fileListWithStats = await Promise.all(
      files.map(async (file) => {
        const stats = await fs.stat(path.join(uploadsPath, file));
        return {
          fileName: file,
          size: (stats.size / 1024 / 1024).toFixed(2), // MB
          createdAt: stats.birthtime,
          isFile: stats.isFile()
        };
      })
    );

    // Filter out directories, sort by date, and get the top 5
    const recentFiles = fileListWithStats
      .filter(f => f.isFile)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(({ fileName, size, createdAt }) => ({ fileName, size, createdAt })); // clean output

    res.json({
      success: true,
      files: recentFiles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Recent Uploads Failed",
    });
  }
});

module.exports = router;