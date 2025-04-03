import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Input,
  CircularProgress,
} from "@mui/material";
import CreateFolder from "./CreateFolder";
import axios from "axios";
import { FaRegFolderClosed } from "react-icons/fa6";
import UploadDrawer from "./uploadDocumentWorking";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import UploadFolder from "./folderUpload";
const App = () => {
  const [isDocumentForm, setIsDocumentForm] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileChange = async (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = () => {
    setIsDocumentForm(true); // Open the drawer
  };

  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const handleCreateFolderClick = () => {
    setIsFolderFormOpen(!isFolderFormOpen);
  };

  const [folderStructure, setFolderStructure] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  useEffect(() => {
    fetchFoldersWithContents();
  }, []);
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
  const handleFolderClick = (folderId, folderPath) => {
    // setNewFolderPath(folderPath);
    console.log(folderPath);
    setFolderStructure(toggleFolderOpenState(folderStructure, folderId));
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [folderFiles, setFolderFiles] = useState([]);
  // const folderInputRef = useRef(null);
  const [folderName, setFolderName] = useState("");
  //function related to folder

  const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
  const folderInputRef = useRef(null);

  const handleFolderSelection = (e) => {
    // const files = Array.from(e.target.files);
    // if (files.length > 0) {
    //   setFolderFiles(files);
    //   setIsDrawerOpen(true);
    // }
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Extract folder name from the first file's path
      const firstFilePath = files[0].webkitRelativePath;
      const folderNameFromPath = firstFilePath.split("/")[0];
      setFolderName(folderNameFromPath);
      setFolderFiles(files);
      setIsDrawerOpen(true);
    }
    e.target.value = ""; // Reset input
  };

  const openDrawer = () => {
    console.log("jjanxad");
    setIsUploadFolderFormOpen(!isUploadFolderFormOpen);
  };
  useEffect(() => {
    if (isDrawerOpen) {
      openDrawer();
    }
  }, [isDrawerOpen]);
  return (
    <>
      <Box className="uploads-documents-links" sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            component="label"
            htmlFor="fileInput"
            sx={{ color: "#e87800" }}
          >
            <HiDocumentArrowUp size={24} />
          </IconButton>
          <Typography
            variant="body1"
            component="label"
            htmlFor="fileInput"
            sx={{ cursor: "pointer" }}
          >
            Upload Document
          </Typography>
          <Input
            type="file"
            id="fileInput"
            onChange={(e) => {
              handleFileChange(e);
              handleFileUpload();
            }}
            sx={{ display: "none" }}
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            //onClick={handleCreateFolderClick}
            sx={{ color: "#e87800" }}
          >
            <FaRegFolderClosed size={20} />
          </IconButton>
          <Typography
            variant="body1"
            onClick={handleCreateFolderClick}
            sx={{ cursor: "pointer" }}
          >
            Create Folder
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 ,cursor:'pointer'}}  onClick={() => folderInputRef.current.click()}>
          <IconButton
            component="label"
            htmlFor="folderInput"
            sx={{ color: "#e87800" }}
          >
            <MdOutlineDriveFolderUpload size={24} />
          </IconButton>

          <Typography variant="body1">Upload Folder</Typography>
            {/* Hidden folder input */}
      <input
        type="file"
        ref={folderInputRef}
        style={{ display: "none" }}
        webkitdirectory="true"
        directory="true"
        onChange={handleFolderSelection}
      />
        </Box>
      </Box>
      {/* Folder selection trigger */}
      {/* <div
        onClick={() => folderInputRef.current.click()}
        style={{ cursor: "pointer", display: "inline-block" }}
      >
        <Typography variant="body1">Upload Folder</Typography>
      </div> */}

      {/* Hidden folder input */}
      <input
        type="file"
        ref={folderInputRef}
        style={{ display: "none" }}
        webkitdirectory="true"
        directory="true"
        onChange={handleFolderSelection}
      />

      {/* Drawer component */}
      {/* {isDrawerOpen && (
        <div className="upload-drawer">
          <h3>Selected Files ({folderFiles.length})</h3>
          <ul>
            {folderFiles.map((file, index) => (
              <li key={index}>{file.webkitRelativePath || file.name}</li>
            ))}
          </ul>
          <button onClick={openDrawer}>Confirm Upload</button>
          <button onClick={() => setIsUploadFolderFormOpen(false)}>
            Cancel
          </button>
        </div>
      )} */}

      <Box mt={5}>
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

      <UploadDrawer
        open={isDocumentForm}
        onClose={() => setIsDocumentForm(false)}
        file={file}
      />
      <CreateFolder
        open={isFolderFormOpen}
        onClose={() => setIsFolderFormOpen(false)}
      />
      <UploadFolder
        open={isUploadFolderFormOpen}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        setFolderName={setFolderName}
        folderName={folderName}
        onClose={() => setIsUploadFolderFormOpen(false)}
      />
    </>
  );
};

export default App;
