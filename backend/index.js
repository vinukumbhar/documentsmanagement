// Backend (server/index.js)
const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const unzipper = require("unzipper");
const cors = require("cors");  // Import CORS middleware
const app = express();
const dbconnect = require("./database/db");

app.use(cors({ origin: "http://localhost:3000" })); // Allow frontend to access API
app.use(express.json()); // Allows parsing JSON body
app.use(express.urlencoded({ extended: true })); // Allows parsing form data
// // Configure Multer for uploading ZIP files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     if (!file.originalname) {
//       return cb(new Error("Invalid file"), false);
//     }
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.originalname) {
//       console.log("Skipping empty file...");
//       return cb(null, false);
//     }
//     cb(null, true);
//   }
// });

// Middleware to dynamically store files
// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Log and get destination path from the request body
    const destinationPath = req.body.destinationPath || "uploads"; // Default to 'uploads' if not provided
    console.log(destinationPath);

    // Set the destination path
    cb(null, destinationPath);
  },
  // filename: (req, file, cb) => {
  //   // Use the original file name, but ensure it is safe for filenames by handling spaces and special characters
  //   const fileName = file.originalname.replace(/\s+/g, "_"); // Replace spaces with underscores
  //   cb(null, fileName); // Save with the original file name
  // },
  filename: (req, file, cb) => {
    if (!file.originalname) {
      return cb(new Error("Invalid file"), false);
    }
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// const upload = multer({ storage: storage });
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.originalname) {
      console.log("Skipping empty file...");
      return cb(null, false);
    }
    cb(null, true);
  }
});
dbconnect();

// app.post("/upload-folder", upload.single("folderZip"), async (req, res) => {
//   if (!req.file || !req.body.folderName) {
//     return res.status(400).json({ error: "Missing file or folder name" });
//   }

//   const folderName = req.body.folderName;
//   const zipPath = req.file.path;
//   const extractPath = path.join(__dirname, "uploads", folderName);

//   try {
//     console.log("Extracting:", zipPath, "to", extractPath);
//     await fs.ensureDir(extractPath); // Ensure directory exists

//     const zipStream = fs.createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractPath }));

//     zipStream.on("close", async () => {
//       try {
//         await fs.unlink(zipPath); // Delete ZIP after extraction
//         console.log("Deleted ZIP file:", zipPath);
//         res.json({ message: "Folder extracted successfully!", path: extractPath });
//       } catch (unlinkError) {
//         console.error("Error deleting ZIP:", unlinkError);
//         res.status(500).json({ error: "Extraction completed, but ZIP deletion failed" });
//       }
//     });

//     zipStream.on("error", async (err) => {
//       console.error("Extraction error:", err);
//       await fs.unlink(zipPath); // Ensure ZIP is deleted on failure
//       res.status(500).json({ error: "Extraction failed, ZIP deleted" });
//     });

//   } catch (error) {
//     console.error("Server error:", error);
//     await fs.unlink(zipPath); // Ensure ZIP is deleted on unexpected error
//     res.status(500).json({ error: "Server error, ZIP deleted" });
//   }
// });

// app.post("/upload-folder", upload.single("folderZip"), async (req, res) => {
//   console.log("Received upload request...");
//   console.log("req.file:", req.file);
//   console.log("req.body.folderName:", req.body.folderName);
//   console.log("req.body.destinationPath:", req.body.destinationPath);
//   if (!req.file || !req.body.folderName || !req.body.destinationPath) {
//     return res.status(400).json({ error: "Missing file, folder name, or destination path" });
//   }

//   const folderName = req.body.folderName;
//   const destinationPath = req.body.destinationPath;
//   console.log(destinationPath)
//   const zipPath = req.file.path;
//   const extractPath = path.join(__dirname, "uploads", destinationPath, folderName); // Extract inside the selected folder

//   try {
//     console.log("Extracting:", zipPath, "to", extractPath);
//     await fs.ensureDir(extractPath);

//     const zipStream = fs.createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractPath }));

//     zipStream.on("close", async () => {
//       try {
//         await fs.unlink(zipPath);
//         console.log("Deleted ZIP file:", zipPath);
//         res.json({ message: "Folder extracted successfully!", path: extractPath });
//       } catch (unlinkError) {
//         console.error("Error deleting ZIP:", unlinkError);
//         res.status(500).json({ error: "Extraction completed, but ZIP deletion failed" });
//       }
//     });

//     zipStream.on("error", async (err) => {
//       console.error("Extraction error:", err);
//       await fs.unlink(zipPath);
//       res.status(500).json({ error: "Extraction failed, ZIP deleted" });
//     });

//   } catch (error) {
//     console.error("Server error:", error);
//     await fs.unlink(zipPath);
//     res.status(500).json({ error: "Server error, ZIP deleted" });
//   }
// });



// app.post("/upload-folder", upload.single("folderZip"), async (req, res) => {
//   if (!req.file || !req.body.folderName || !req.body.destinationPath) {
//     return res.status(400).json({ error: "Missing file, folder name, or destination path" });
//   }

//   const folderName = req.body.folderName;
//   const destinationPath = req.body.destinationPath; // Get the destination path from request
//   const zipPath = req.file.path;
//   const extractPath = path.join(__dirname, destinationPath, folderName); // Use destination path

//   try {
//     console.log("Extracting:", zipPath, "to", extractPath);
//     await fs.ensureDir(extractPath); // Ensure directory exists

//     const zipStream = fs.createReadStream(zipPath)
//       .pipe(unzipper.Extract({ path: extractPath }));

//     zipStream.on("close", async () => {
//       try {
//         await fs.unlink(zipPath); // Delete ZIP after extraction
//         console.log("Deleted ZIP file:", zipPath);
//         res.json({ 
//           message: "Folder extracted successfully!", 
//           path: extractPath,
//           destination: destinationPath
//         });
//       } catch (unlinkError) {
//         console.error("Error deleting ZIP:", unlinkError);
//         res.status(500).json({ error: "Extraction completed, but ZIP deletion failed" });
//       }
//     });

//     zipStream.on("error", async (err) => {
//       console.error("Extraction error:", err);
//       await fs.unlink(zipPath); // Ensure ZIP is deleted on failure
//       res.status(500).json({ error: "Extraction failed, ZIP deleted" });
//     });

//   } catch (error) {
//     console.error("Server error:", error);
//     await fs.unlink(zipPath); // Ensure ZIP is deleted on unexpected error
//     res.status(500).json({ error: "Server error, ZIP deleted" });
//   }
// });


app.post("/upload-folder", upload.single("folderZip"), async (req, res) => {
  if (!req.file || !req.body.folderName || !req.body.destinationPath) {
    return res.status(400).json({ error: "Missing file, folder name, or destination path" });
  }

  const folderName = req.body.folderName;
  const destinationPath = req.body.destinationPath;
  const zipPath = req.file.path;
  const extractPath = path.join(  destinationPath, folderName);
console.log(extractPath)
  try {
    console.log("Extracting:", zipPath, "to", extractPath);
    await fs.ensureDir(extractPath);

    const zipStream = fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }));

    zipStream.on("close", async () => {
      try {
        await fs.unlink(zipPath);
        console.log("Deleted ZIP file:", zipPath);
        res.json({ 
          message: "Folder extracted successfully!", 
          path: extractPath,
          destination: destinationPath 
        });
      } catch (unlinkError) {
        console.error("Error deleting ZIP:", unlinkError);
        res.status(500).json({ error: "Extraction completed, but ZIP deletion failed" });
      }
    });

    zipStream.on("error", async (err) => {
      console.error("Extraction error:", err);
      await fs.unlink(zipPath);
      res.status(500).json({ error: "Extraction failed, ZIP deleted" });
    });

  } catch (error) {
    console.error("Server error:", error);
    await fs.unlink(zipPath);
    res.status(500).json({ error: "Server error, ZIP deleted" });
  }
});
app.get("/getFolders", async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "uploads");

    // Check if the directory exists
    if (!fs.existsSync(uploadsPath)) {
      return res.status(404).send({ message: "Uploads directory not found" });
    }

    // Read the directory contents and filter out only folders
    const items = await fs.readdir(uploadsPath, { withFileTypes: true });
    const folders = items
      .filter((item) => item.isDirectory())
      .map((folder) => folder.name);

    res.status(200).send({ folders });
  } catch (error) {
    console.error("Error getting folders:", error);
    res.status(500).send({ error: "Failed to retrieve folders" });
  }
});
app.get("/getFoldersWithContents", async (req, res) => {
  try {
    const uploadsPath = path.join(__dirname, "uploads");

    if (!fs.existsSync(uploadsPath)) {
      return res.status(404).send({ message: "Uploads directory not found" });
    }

    // Function to get folder structure
    const getFolderContents = (dirPath) => {
      const items = fs.readdirSync(dirPath, { withFileTypes: true });

      return items.map((item) => {
        const fullPath = path.join(dirPath, item.name);

        if (item.isDirectory()) {
          return {
            id: fullPath, // Unique ID
            folder: item.name,
            isOpen: false, // Default closed
            contents: getFolderContents(fullPath), // Recursively fetch contents
          };
        } else {
          return { id: fullPath, file: item.name };
        }
      });
    };

    const folders = getFolderContents(uploadsPath);

    res.status(200).json({ folders });
  } catch (error) {
    console.error("Error retrieving folders:", error);
    res.status(500).json({ error: "Failed to retrieve folders and files" });
  }
});


// app.post("/uploadfile", upload.single("file"), (req, res) => {
//   // Extract path from the form data
//   let targetPath = req.body.destinationPath;
//   // Replace all occurrences of '//' with '/'
//   targetPath = targetPath.replace(/\/\//g, "/");
// console.log(targetPath)
//   if (!targetPath) {
//     return res
//       .status(400)
//       .send({ message: "Path is required in the request body." });
//   }

//   if (!req.file) {
//     return res.status(400).send({ message: "No file uploaded." });
//   }
//   res.status(200).send({
//     message: "File uploaded successfully!",
//     filePath: `/uploads/${req.file.filename}`,
//   });
// });
// API to create a folder

app.post("/uploadfile", upload.single("file"), (req, res) => {
  // Extract path from the form data
  let targetPath = req.body.destinationPath;
  // Replace all occurrences of '//' with '/'
  targetPath = targetPath.replace(/\/\//g, "/");

  if (!targetPath) {
    return res
      .status(400)
      .send({ message: "Path is required in the request body." });
  }

  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded." });
  }
  res.status(200).send({
    message: "File uploaded successfully!",
    // filePath: `${targetPath}/${req.file.filename}`,
  });
});


// Create folder route
app.post("/createFolder", async (req, res) => {
  try {
    const { folderName, path: folderPath } = req.body;

    if (!folderName || !folderPath) {
      return res.status(400).json({ error: "Both folder name and path are required" });
    }

    const fullPath = path.join(__dirname, "uploads", folderPath, folderName);
    
    // Check if folder already exists
    if (fs.existsSync(fullPath)) {
      return res.status(400).json({ error: "Folder already exists!" });
    }

    // Create the folder
    fs.mkdirSync(fullPath, { recursive: true });

    console.log("Folder created at:", fullPath);
    res.json({ message: "Folder created successfully!", fullPath });
  } catch (error) {
    console.error("Error creating folder:", error);
    res.status(500).json({ error: "Failed to create folder" });
  }
});
// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(8000, () => console.log("Server running on port 8000"));