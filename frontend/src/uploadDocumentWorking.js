// src/components/UploadDrawer.js
import React, { useEffect, useState } from "react";
import { Box, Typography, Drawer, IconButton ,CircularProgress,Button } from "@mui/material";
import { MdClose } from "react-icons/md";
import axios from "axios";
const UploadDrawer = ({ open, onClose, file }) => {
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
   // Function to render folder & file contents
  //  const renderContents = (contents) => {
  //   return contents.map((item, index) => {
  //     if (item.folder) {
  //       return (
  //         <Box key={item.id} style={{ marginLeft: "20px" }}>
  //           <Box
  //             style={{
  //               cursor: "pointer",
  //               display: "flex",
  //               alignItems: "center",
  //             }}
  //             onClick={() => setFolderStructure(toggleFolderOpenState(folderStructure, item.id))}
  //           >
  //             {item.isOpen ? "📂" : "📁"}{" "}
  //             <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
  //           </Box>
  //           {item.isOpen && item.contents.length > 0 && <Box>{renderContents(item.contents)}</Box>}
  //         </Box>
  //       );
  //     } else if (item.file) {
  //       return (
  //         <Box key={item.id} style={{ marginLeft: "40px" }}>
  //           📄 {item.file}
  //         </Box>
  //       );
  //     }
  //     return null;
  //   });
  // };
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
  const handleUpload = async () => {
    let data = new FormData();
    data.append("destinationPath", destinationPath);
    data.append("file", file);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8000/uploadfile`,
      data: data,
      
    };
    axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      alert("File uploaded successfully!");
     
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to upload the file.");
    });

  
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
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload to Selected Folder
            </Button>
          </Box>
      
      </Box>
    </Drawer>
  );
};

export default UploadDrawer;
