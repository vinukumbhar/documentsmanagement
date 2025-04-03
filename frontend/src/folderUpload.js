// src/components/UploadDrawer.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Drawer, IconButton ,CircularProgress,Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import axios from "axios";
import JSZip from "jszip";
const UploadDrawer = ({ open, onClose, folderFiles,setFolderName,folderName }) => {
  const [folderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    if (open) {
      fetchFoldersWithContents();
    }
  }, [open]);
  const fetchFoldersWithContents = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/getFoldersWithContents");
      setFolderStructure(response.data.folders);
    } catch (error) {
      console.error("Error fetching folder structure:", error);
    }
    setLoading(false);
  };
  // Recursive function to update folder open state while keeping all data
  const toggleFolderOpenState = (folders, folderId) => {
    return folders.map((folder) => {
      if (folder.id === folderId) {
        return { ...folder, isOpen: !folder.isOpen };
      } else if (folder.contents) {
        return { ...folder, contents: toggleFolderOpenState(folder.contents, folderId) };
      }
      return folder;
    });
  };
   
  const renderContents = (contents, parentPath = "") => {
    return contents.map((item) => {
      const currentPath = `${parentPath}/${item.folder || ""}`.replace("//", "/");

      if (item.folder) {
        return (
          <Box key={item.id} style={{ marginLeft: "20px" }}>
            <Box
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: selectedFolder === currentPath ? "#e0e0e0" : "transparent",
                padding: "4px",
                borderRadius: "4px",
              }}
              onClick={() => handleFolderClick(item.id, currentPath)}
            >
              {item.isOpen ? "📂" : "📁"} <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
            </Box>
            {item.isOpen && item.contents.length > 0 && <Box>{renderContents(item.contents, currentPath)}</Box>}
          </Box>
        );
      } else if (item.file) {
        return (
          <Box key={item.id} style={{ marginLeft: "40px" }}>
            📄 {item.file}
          </Box>
        );
      }
      return null;
    });
  };
  const [newFolderPath, setNewFolderPath] = useState("");
  const handleFolderClick = (folderId, folderPath) => {
    setNewFolderPath(folderPath);
    console.log(folderPath)
    setFolderStructure(toggleFolderOpenState(folderStructure, folderId));
  };
  // const handleUpload = async () => {
  //   if (!file || !selectedFolder) {
  //     alert("Please select a file and a folder first.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("destinationPath", selectedFolder);

  //   try {
  //     const response = await axios.post("http://localhost:8000/uploadfile", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });

  //     alert(response.data.message);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("File upload failed!");
  //   }
  // };
  const [destinationPath, setDestinationPath] = useState("");

  useEffect(() => {
    if (newFolderPath) {
      console.log("The folder path has changed to:", newFolderPath);
      setDestinationPath(
        `uploads/${newFolderPath}`
      );
      // Perform additional actions when newFolderPath changes
    }
  }, [newFolderPath]);

//  const handleSubmitFolder = async () => {
//   console.log("Uploading folder...");
//   console.log("folderFiles:", folderFiles);
//   console.log("folderName:", folderName);
//   console.log("destinationPath:", destinationPath);

//   if (!folderFiles || folderFiles.length === 0 || !folderName || !destinationPath) {
//     alert("Please select a folder and destination path before uploading.");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("folderZip", folderFiles[0]); // Check if this is correctly appended
//   formData.append("folderName", folderName);
//   formData.append("destinationPath", destinationPath);

//   console.log("FormData contents:");
//   for (let pair of formData.entries()) {
//     console.log(pair[0], pair[1]);
//   }

//   try {
//     const response = await axios.post("http://localhost:8000/upload-folder", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     alert(response.data.message);
//     console.log("Folder uploaded to:", response.data.path);
//   } catch (error) {
//     console.error("Error uploading folder:", error);
//     alert("Folder upload failed!");
//   }
// };

  

// const handleSubmitFolder = async () => {
//   if (!folderFiles || folderFiles.length === 0) return;

//   const firstFile = folderFiles[0];
//   const folderPath = firstFile.webkitRelativePath;
//   const folderName = folderPath.split("/")[0]; // Extract folder name

//   const zip = new JSZip();
//   Array.from(folderFiles).forEach((file) => {
//     const relativePath = file.webkitRelativePath.replace(`${folderName}/`, ""); // Maintain structure
//     zip.file(relativePath, file);
//   });

//   const zipBlob = await zip.generateAsync({ type: "blob" });

//   const formData = new FormData();
//   formData.append("folderZip", zipBlob, `${folderName}.zip`); // Name ZIP after the folder
//   formData.append("folderName", folderName); // Send folder name

//   try {
//     await axios.post("http://localhost:8000/upload-folder", formData, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });
//     alert("Folder uploaded successfully!");
//   } catch (error) {
//     console.error("Upload failed:", error);
//     alert("Error uploading folder.");
//   }
// };


const handleSubmitFolder = async () => {
  if (!folderFiles || folderFiles.length === 0 || !destinationPath) {
    alert("Please select a folder and destination path before uploading.");
    return;
  }

  const firstFile = folderFiles[0];
  const folderPath = firstFile.webkitRelativePath;
  const folderName = folderPath.split("/")[0]; // Extract folder name

  console.log("Uploading folder...");
  console.log("folderFiles:", folderFiles);
  console.log("folderName:", folderName);
  console.log("destinationPath:", destinationPath);

  const zip = new JSZip();
  Array.from(folderFiles).forEach((file) => {
    const relativePath = file.webkitRelativePath.replace(`${folderName}/`, ""); // Maintain structure
    zip.file(relativePath, file);
  });

  const zipBlob = await zip.generateAsync({ type: "blob" });

  const formData = new FormData();
  formData.append("folderZip", zipBlob, `${folderName}.zip`); // Name ZIP after the folder
  formData.append("folderName", folderName);
  formData.append("destinationPath", destinationPath); // Add missing destination path

  console.log("FormData contents:");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]); // Log formData entries
  }

  try {
    const response = await axios.post("http://localhost:8000/upload-folder", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert(response.data.message);
    console.log("Folder uploaded to:", response.data.path);
  } catch (error) {
    console.error("Error uploading folder:", error);
    alert("Folder upload failed!");
  }
};

  
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 600, padding: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Upload Document</Typography>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : folderStructure.length > 0 ? (
          <Box>{renderContents(folderStructure)}</Box>
        ) : (
          <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            No folders found
          </Typography>
        )}
        
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
          <Button
          variant="contained"
          color="primary"
        //   disabled={files.length === 0}
          onClick={handleSubmitFolder}
        >
          Upload Folder
        </Button>
          </Box>
      
      </Box>
    </Drawer>
  );
};

export default UploadDrawer;
