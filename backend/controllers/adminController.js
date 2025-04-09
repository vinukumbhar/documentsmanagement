const path = require("path");
const fs = require("fs/promises");
const File = require("../FileModel")
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
const moveBetweenSealedUnsealed = async (req, res) => {
  try {
    const { id } = req.params;
    const { itemPath, direction } = req.body; // direction: 'seal' or 'unseal'

    if (!id || !itemPath || !direction) {
      return res.status(400).json({ 
        error: "Missing required parameters: folder ID, item path, or direction" 
      });
    }

    if (direction !== 'seal' && direction !== 'unseal') {
      return res.status(400).json({ 
        error: "Invalid direction. Must be 'seal' or 'unseal'" 
      });
    }

    const basePath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Client Uploaded Documents`);
    const sourcePath = path.join(
      basePath, 
      direction === 'seal' ? 'unsealed' : 'sealed',
      itemPath
    );
    const targetPath = path.join(
      basePath, 
      direction === 'seal' ? 'sealed' : 'unsealed',
      itemPath
    );

    // Check if source exists
    await fs.access(sourcePath);

    // Create target directory structure if needed
    await fs.mkdir(path.dirname(targetPath), { recursive: true });

    // Move the file/folder
    await fs.rename(sourcePath, targetPath);

    res.status(200).json({ 
      message: `Item ${direction === 'seal' ? 'sealed' : 'unsealed'} successfully` 
    });
  } catch (error) {
    console.error("Error moving item:", error.message);
    if (error.code === 'ENOENT') {
      return res.status(404).json({ error: "Item not found" });
    }
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
// const getsFirmDocs = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Missing folder ID in request params." });
//     }

//     const uploadsPath = path.join(__dirname, `../uploads/FolderTemplates/${id}/Firm Docs Shared With Client`);

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

//     // Wrap with "Private" folder
//     const result = {
//       folders: [
//         {
//           folder: "Firm Docs Shared With Client",
//           contents: folderData
//         }
//       ]
//     };

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error fetching client uploaded documents:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };


// const getsFirmDocs = async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!id) {
//       return res.status(400).json({ error: "Missing folder ID in request params." });
//     }

//     // Find all files matching this folder ID under 'Firm Docs Shared With Client'
//     const dbFiles = await File.find({
//       filePath: { $regex: new RegExp(`FolderTemplates/${id}/Firm Docs Shared With Client`) }
//     });

//     // Map to desired format
//     const contents = dbFiles.map(file => ({
//       file: file.filename,
//       metadata: file
//     }));

//     const result = {
//       folder: "Firm Docs Shared With Client",
//       contents
//     };

//     res.status(200).json(result);
//   } catch (error) {
//     console.error("Error fetching firm docs:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const getsFirmDocs = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing folder ID in request params." });
    }

    const dbFiles = await File.find({
      filePath: { $regex: new RegExp(`FolderTemplates/${id}/Firm Docs Shared With Client`) }
    });

    const contents = [];
    const folderMap = new Map();

    dbFiles.forEach(file => {
      const relativePath = file.filePath.split(`FolderTemplates/${id}/Firm Docs Shared With Client`)[1] || "";
      const cleanPath = relativePath.replace(/^\/+/, ""); // Remove leading slash
      const pathSegments = cleanPath.split("/");

      if (pathSegments.length === 1 && pathSegments[0] === "") {
        // Direct file inside "Firm Docs Shared With Client"
        if (file.filename !== "#$default.txt") {
          contents.push({
            file: file.filename,
            metadata: file
          });
        }
      } else {
        // It's in a subfolder like "100/"
        const folderName = pathSegments[0];
        if (file.filename === "#$default.txt") {
          folderMap.set(folderName, {
            folder: folderName,
            contents: [] // we won't show the file
          });
        }
      }
    });

    const folderList = Array.from(folderMap.values());

    const result = {
      folder: "Firm Docs Shared With Client",
      contents: [...folderList, ...contents] // folders first, then files
    };

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching firm docs:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {getsFirmDocs,moveToSealed, moveClientUploadedDocsToUnsealed,moveClientUploadedDocsToSealed,getsClientUploadedDocsUnsealed ,getsClientUploadedDocssealed,getsPrivateDocs,getsClientUploadedDocs,moveBetweenSealedUnsealed};
