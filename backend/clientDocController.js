const path = require("path");
const fs = require("fs/promises");

const getClientAllFolders = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadsPath = path.join(__dirname, "./uploads/ClientData", id);

    try {
      await fs.access(uploadsPath);
    } catch (err) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const getAllItems = async (dir) => {
      const items = await fs.readdir(dir);
      const itemsPromises = items.map(async (item) => {
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);
        if (stats.isDirectory()) {
          const subItems = await getAllItems(itemPath);
          return { folder: item, contents: subItems };
        } else {
          return { file: item };
        }
      });
      return Promise.all(itemsPromises);
    };

    const folderData = await getAllItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching all folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getClientPublicFolders = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadsPath = path.join(__dirname, "./uploads/ClientData", id);

    try {
      await fs.access(uploadsPath);
    } catch (err) {
      return res.status(404).json({ error: "Folder not found" });
    }

    const getAllItems = async (dir) => {
      const items = await fs.readdir(dir);
      const itemsPromises = items.map(async (item) => {
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);

        // Skip any folder named "Private"
        if (stats.isDirectory() && item.toLowerCase() === "private") {
          return null;
        }

        if (stats.isDirectory()) {
          const subItems = await getAllItems(itemPath);
          return { folder: item, contents: subItems };
        } else {
          return { file: item };
        }
      });

      // Filter out nulls (skipped "Private" folders)
      const results = await Promise.all(itemsPromises);
      return results.filter(Boolean);
    };

    const folderData = await getAllItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching public folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUnsealedClientDocuments = async (req, res) => {
  try {
    const { id } = req.params;

    const basePath = path.join(__dirname, "./uploads/ClientData", id, "Client Uploaded Documents");

    try {
      await fs.access(basePath);
    } catch (err) {
      return res.status(404).json({ error: "'Client Uploaded Documents' folder not found" });
    }

    const getUnsealedItems = async (dir) => {
      const items = await fs.readdir(dir);
      const itemsPromises = items.map(async (item) => {
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);

        // Skip any folder named "Sealed"
        if (stats.isDirectory() && item.toLowerCase() === "sealed") {
          return null;
        }

        if (stats.isDirectory()) {
          const subItems = await getUnsealedItems(itemPath);
          return { folder: item, contents: subItems };
        } else {
          return { file: item };
        }
      });

      // Remove null entries (e.g., skipped "Sealed" folders)
      const results = await Promise.all(itemsPromises);
      return results.filter(Boolean);
    };

    const documents = await getUnsealedItems(basePath);
    res.status(200).json({ documents });
  } catch (error) {
    console.error("Error fetching unsealed documents:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getFilteredClientFolders = async (req, res) => {
  try {
    const { id } = req.params;
    const uploadsPath = path.join(__dirname, "./uploads/ClientData", id);

    try {
      await fs.access(uploadsPath);
    } catch (err) {
      return res.status(404).json({ error: "Client folder not found" });
    }

    const getFilteredItems = async (dir, currentFolder = "") => {
      const items = await fs.readdir(dir);
      const itemsPromises = items.map(async (item) => {
        const itemPath = path.join(dir, item);
        const stats = await fs.stat(itemPath);

        // Skip root-level "Private" folders
        if (stats.isDirectory() && currentFolder === "" && item.toLowerCase() === "private") {
          return null;
        }

        // Skip "Sealed" folders only within "Client Uploaded Documents"
        if (
          stats.isDirectory() &&
          currentFolder.toLowerCase() === "client uploaded documents" &&
          item.toLowerCase() === "sealed"
        ) {
          return null;
        }

        if (stats.isDirectory()) {
          const subItems = await getFilteredItems(itemPath, item);
          return { folder: item, contents: subItems };
        } else {
          return { file: item };
        }
      });

      const results = await Promise.all(itemsPromises);
      return results.filter(Boolean);
    };

    const folderData = await getFilteredItems(uploadsPath);
    res.status(200).json({ folders: folderData });
  } catch (error) {
    console.error("Error fetching filtered folders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



module.exports = { getClientAllFolders ,getClientPublicFolders, getUnsealedClientDocuments,getFilteredClientFolders};
