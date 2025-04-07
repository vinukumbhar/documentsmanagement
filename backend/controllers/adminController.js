const path = require("path");
const fs = require("fs/promises");

const getsClientUploadedDocsUnsealed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const uploadsPath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Client Uploaded Documents/unsealed`);

    // Recursive function to get all files and subfolders
    const getAllItems = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const items = await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const subItems = await getAllItems(fullPath);
          return { folder: entry.name, contents: subItems };
        } else {
          return { file: entry.name };
        }
      }));
      return items;
    };

    // Check if directory exists
    await fs.access(uploadsPath);

    const folderData = await getAllItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching client uploaded documents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getsClientUploadedDocssealed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const uploadsPath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Client Uploaded Documents/sealed`);

    // Recursive function to get all files and subfolders
    const getAllItems = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const items = await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const subItems = await getAllItems(fullPath);
          return { folder: entry.name, contents: subItems };
        } else {
          return { file: entry.name };
        }
      }));
      return items;
    };

    // Check if directory exists
    await fs.access(uploadsPath);

    const folderData = await getAllItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching client uploaded documents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const getsPrivateDocs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const uploadsPath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Private`);

    // Recursive function to get all files and subfolders
    const getAllItems = async (dir) => {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      const items = await Promise.all(entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          const subItems = await getAllItems(fullPath);
          return { folder: entry.name, contents: subItems };
        } else {
          return { file: entry.name };
        }
      }));
      return items;
    };

    // Check if directory exists
    await fs.access(uploadsPath);

    const folderData = await getAllItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching client uploaded documents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getsClientUploadedDocsUnsealed ,getsClientUploadedDocssealed,getsPrivateDocs};
