// src/components/UploadDrawer.js
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  CircularProgress,
  TextField,Button
} from "@mui/material";
import { MdClose } from "react-icons/md";
import axios from "axios";
const UploadDrawer = ({ open, onClose }) => {
  const [folderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [newFolderName, setNewFolderName] = useState("");
  useEffect(() => {
    if (open) {
      fetchFoldersWithContents();
    }
  }, [open]);
  const fetchFoldersWithContents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/getFoldersWithContents"
      );
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
        return {
          ...folder,
          contents: toggleFolderOpenState(folder.contents, folderId),
        };
      }
      return folder;
    });
  };
  const renderContents = (contents, parentPath = "") => {
    return contents.map((item) => {
      const currentPath = `${parentPath}/${item.folder || ""}`.replace(
        "//",
        "/"
      );

      if (item.folder) {
        return (
          <Box key={item.id} style={{ marginLeft: "20px" }}>
            <Box
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor:
                  selectedFolder === currentPath ? "#e0e0e0" : "transparent",
                padding: "4px",
                borderRadius: "4px",
              }}
              onClick={() => handleFolderClick(item.id, currentPath)}
            >
              {item.isOpen ? "📂" : "📁"}{" "}
              <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
            </Box>
            {item.isOpen && item.contents.length > 0 && (
              <Box>{renderContents(item.contents, currentPath)}</Box>
            )}
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
    console.log(folderPath);
    setFolderStructure(toggleFolderOpenState(folderStructure, folderId));
  };

  const [destinationPath, setDestinationPath] = useState("");

  useEffect(() => {
    if (newFolderPath) {
      console.log("The folder path has changed to:", newFolderPath);
      setDestinationPath(`uploads/${newFolderPath}`);
      // Perform additional actions when newFolderPath changes
    }
  }, [newFolderPath]);
  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      alert("Please enter a folder name.");
      return;
    }

    const folderPath = newFolderPath ? `${newFolderPath}/${newFolderName}` : newFolderName;
    console.log("Creating folder at:", folderPath);

    try {
      const response = await axios.post("http://localhost:8000/createFolder", {
        folderName: newFolderName,
        path: newFolderPath || "uploads",
      });

      alert(response.data.message);
      setNewFolderName("");
      fetchFoldersWithContents(); // Refresh folder list
    } catch (error) {
      console.error("Error creating folder:", error.response?.data || error.message);
      alert("Failed to create folder!");
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 600, padding: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Create folder</Typography>
          <IconButton onClick={onClose}>
            <MdClose />
          </IconButton>
        </Box>
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          placeholder="Folder Name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <Button 
          variant="contained" 
          sx={{ mt: 2 }} 
          onClick={handleCreateFolder}
        >
          Create Folder
        </Button>
        {loading ? (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        ) : folderStructure.length > 0 ? (
          <Box>{renderContents(folderStructure)}</Box>
        ) : (
          <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
            No folders found
          </Typography>
        )}


      </Box>
    </Drawer>
  );
};

export default UploadDrawer;
