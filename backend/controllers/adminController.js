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

const moveClientUploadedDocsToUnsealed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const basePath = path.join(__dirname, "../uploads/FolderTemplates", id, "Client Uploaded Documents");
    const sealedPath = path.join(basePath, "sealed");
    const unsealedPath = path.join(basePath, "unsealed");

    // Recursive function to move files and folders
    const moveRecursive = async (src, dest) => {
      await fs.mkdir(dest, { recursive: true });

      const entries = await fs.readdir(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          await moveRecursive(srcPath, destPath);
          await fs.rmdir(srcPath); // Remove empty source folder
        } else {
          await fs.rename(srcPath, destPath); // Move file
        }
      }
    };

    await fs.access(sealedPath); // Make sure sealed exists
    await moveRecursive(sealedPath, unsealedPath);

    res.status(200).json({ message: "Documents moved back to unsealed successfully." });
  } catch (error) {
    console.error("Error moving documents back to unsealed:", error.message);
    res.status(500).json({ error: "Failed to move documents back to unsealed." });
  }
};

const moveClientUploadedDocsToSealed = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const basePath = path.join(__dirname, "../uploads/FolderTemplates", id, "Client Uploaded Documents");
    const unsealedPath = path.join(basePath, "unsealed");
    const sealedPath = path.join(basePath, "sealed");

    // Recursive function to move files and folders
    const moveRecursive = async (src, dest) => {
      await fs.mkdir(dest, { recursive: true });

      const entries = await fs.readdir(src, { withFileTypes: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
          await moveRecursive(srcPath, destPath);
          await fs.rmdir(srcPath); // Remove empty source folder
        } else {
          await fs.rename(srcPath, destPath); // Move file
        }
      }
    };

    await fs.access(unsealedPath); // Make sure unsealed exists
    await moveRecursive(unsealedPath, sealedPath);

    res.status(200).json({ message: "Documents moved to sealed successfully." });
  } catch (error) {
    console.error("Error moving client documents to sealed:", error.message);
    res.status(500).json({ error: "Failed to move documents." });
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
const moveToSealed = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemPath } = req.body; // Path relative to the unsealed directory

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    if (!itemPath) {
      return res.status(400).json({ error: "Missing item path in request body." });
    }

    const sourceBasePath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Client Uploaded Documents/unsealed`);
    const destinationBasePath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Client Uploaded Documents/sealed`);

    const sourcePath = path.join(sourceBasePath, itemPath);
    const destinationPath = path.join(destinationBasePath, itemPath);

    // Check if source exists
    await fs.access(sourcePath);

    // Create destination directory structure if it doesn't exist
    await fs.mkdir(path.dirname(destinationPath), { recursive: true });

    // Move the item
    await fs.rename(sourcePath, destinationPath);

    res.status(200).json({ message: "Item moved successfully" });
  } catch (error) {
    console.error("Error moving item to sealed:", error.message);
    
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: "Item not found" });
    }
    
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getsClientUploadedDocs = async (req, res) => {
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

    const folderContents = await getAllItems(uploadsPath);

    // Wrap with only "Client Uploaded Documents"
    const result = {
      folders: [
        {
          folder: "Client Uploaded Documents",
          contents: folderContents
        }
      ]
    };

    res.status(200).json(result);
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

    // Wrap with "Private" folder
    const result = {
      folders: [
        {
          folder: "Private",
          contents: folderData
        }
      ]
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching client uploaded documents:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const getsPrivateDocs = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Missing folder ID in request params." });
//     }

//     const uploadsPath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Private`);

//     // Recursive function to get all files and subfolders
//     const getAllItems = async (dir) => {
//       const entries = await fs.readdir(dir, { withFileTypes: true });
//       const items = await Promise.all(entries.map(async (entry) => {
//         const fullPath = path.join(dir, entry.name);
//         if (entry.isDirectory()) {
//           const subItems = await getAllItems(fullPath);
//           return { folder: entry.name, contents: subItems };
//         } else {
//           return { file: entry.name };
//         }
//       }));
//       return items;
//     };

//     // Check if directory exists
//     await fs.access(uploadsPath);

//     const folderData = await getAllItems(uploadsPath);
//     res.status(200).json({ folders: folderData });
//   } catch (error) {
//     console.error("Error fetching client uploaded documents:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
module.exports = {moveToSealed, moveClientUploadedDocsToUnsealed,moveClientUploadedDocsToSealed,getsClientUploadedDocsUnsealed ,getsClientUploadedDocssealed,getsPrivateDocs,getsClientUploadedDocs};
