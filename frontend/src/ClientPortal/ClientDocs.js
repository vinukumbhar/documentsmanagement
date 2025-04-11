import { Box, Typography,IconButton ,Input} from '@mui/material'
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import UploadDrawer from "./uploadDocumentWorking";
import CreateFolder from "./CreateFolder";
import UploadFolder from "./folderUpload";
const ClientDocs = () => {
  const templateId = "67ea43c004956fca8db1d445";
    const folderInputRef = useRef(null);
  const [combinedFolderStructure,setCombinedFolderStructure]=useState(null)
    const [file, setFile] = useState(null);
      const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
      const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
    const [isDocumentForm, setIsDocumentForm] = useState(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleFileUpload = () => setIsDocumentForm(true);
  const handleCreateFolderClick = () => setIsFolderFormOpen((prev) => !prev);
  const [error, setError] = useState(null);
    const [folderFiles, setFolderFiles] = useState([]);
    const [folderName, setFolderName] = useState("");
  const [structFolder, setStructFolder] = useState(null);
   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleFolderSelection = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const folderNameFromPath = files[0].webkitRelativePath.split("/")[0];
      setFolderName(folderNameFromPath);
      setFolderFiles(files);
      setIsDrawerOpen(true);
    }
    e.target.value = "";
  };
  const openDrawer = () => {
    setIsUploadFolderFormOpen(true);
  };
    useEffect(() => {
      if (isDrawerOpen) openDrawer();
    }, [isDrawerOpen]);

    useEffect(() => {
      fetchBothFolders();
      fetchUnSealedFolders()
    }, [templateId]);
    const fetchUnSealedFolders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/admin/unsealed/${templateId}`
        );
        const folders = res.data.folders || [];
  
        const addIsOpen = (items, parentId = "") =>
          items.map((folder, index) => ({
            ...folder,
            isOpen: false,
            id: `${parentId}${index}`,
            sealed: false,
            contents: folder.contents
              ? addIsOpen(folder.contents, `${parentId}${index}-`)
              : [],
          }));
  
        setStructFolder({ ...res.data, folders: addIsOpen(folders) });
      } catch (err) {
        setError(err.message || "Error fetching unsealed folders.");
      }
    };
    const fetchBothFolders = async () => {
      try {
        const [sealedRes, unsealedRes] = await Promise.all([
          axios.get(`http://localhost:8000/admin/sealedFolders/${templateId}`),
          axios.get(`http://localhost:8000/admin/unsealed/${templateId}`),
        ]);
    
        const addIsOpen = (items, parentId = "", sealed = false) =>
          items.map((folder, index) => ({
            ...folder,
            isOpen: false,
            id: `${parentId}${index}`,
            sealed,
            contents: folder.contents
              ? addIsOpen(folder.contents, `${parentId}${index}-`, sealed)
              : [],
          }));
    
        const sealedFolders = addIsOpen(sealedRes.data.folders || [], "", true);
        const unsealedFolders = addIsOpen(unsealedRes.data.folders || [], "", false);
    
        // Combine into a single parent folder
        const combinedFolders = [
          {
            folder: "Client Uploaded Documents",
            isOpen: false,
            id: "client-root",
            contents: [...sealedFolders, ...unsealedFolders],
          },
        ];
    
        // Set to a single state
        setCombinedFolderStructure(combinedFolders); // <- new unified state
        console.log("jaanvi patil",combinedFolders)
      } catch (err) {
        setError(err.message || "Error fetching folders.");
      }
    };
    const toggleFolder = (folderId, folders) => {
      return folders.map((item) => {
        if (item.id === folderId) {
          return { ...item, isOpen: !item.isOpen };
        } else if (item.contents?.length) {
          return { ...item, contents: toggleFolder(folderId, item.contents) };
        }
        return item;
      });
    };
  const handleToggle = (id) => {
    setCombinedFolderStructure((prev) => toggleFolder(id, prev));
  };
   const renderTree = (items) => {
      return items.map((item) => {
        if (item.folder) {
          return (
            <div key={item.id} style={{ paddingLeft: "20px" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingRight: "8px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                  onClick={() => handleToggle(item.id)}
                >
                  <span>{item.isOpen ? "📂" : "📁"}</span>
                  <span>{item.folder}</span>
                  {item.sealed && (
                    <span
                      style={{
                        backgroundColor: "#d50000",
                        color: "#fff",
                        padding: "2px 6px",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    >
                      Sealed
                    </span>
                  )}
                </div>
                {/* <BsThreeDotsVertical style={{ cursor: "pointer" }} /> */}
               
  
              </div>
              {item.isOpen && item.contents?.length > 0 && (
                <div>{renderTree(item.contents)}</div>
              )}
            </div>
          );
        } else {
          return (
            <div
              key={item.id}
              style={{
                paddingLeft: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingRight: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📄</span>
                <span>{item.file}</span>
                {item.sealed && (
                  <span
                    style={{
                      backgroundColor: "#d50000",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  >
                    Sealed
                  </span>
                )}
              </div>
              <div style={{ position: "relative" }}>
             
            </div>
            </div>
          );
        }
      });
    };
    if (error) return <div>Error: {error}</div>;
    if (!combinedFolderStructure ) return <div>Loading...</div>;
  return (
  <Box>
    <Typography variant="h2">CLIENT PORTAL</Typography>

    <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "16px",
          maxWidth: "800px",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
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

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            onClick={handleCreateFolderClick}
          >
            <IconButton sx={{ color: "#e87800" }}>
              <FaRegFolderClosed size={20} />
            </IconButton>
            <Typography variant="body1" sx={{ cursor: "pointer" }}>
              Create Folder
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
            onClick={() => folderInputRef.current.click()}
          >
            <IconButton sx={{ color: "#e87800" }}>
              <MdOutlineDriveFolderUpload size={24} />
            </IconButton>
            <Typography variant="body1">Upload Folder</Typography>
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
      </Box>

      <Box>
      {renderTree(combinedFolderStructure)}
      </Box>


      <UploadDrawer
        open={isDocumentForm}
        onClose={() => setIsDocumentForm(false)}
        file={file}
        fetchUnSealedFolders={fetchUnSealedFolders}
        // fetchAdminPrivateFolders={fetchPrivateFolders}
      />
       <CreateFolder
        open={isFolderFormOpen}
        onClose={() => setIsFolderFormOpen(false)}
        fetchUnSealedFolders={fetchUnSealedFolders}
        // fetchAdminPrivateFolders={fetchPrivateFolders}
      />
       <UploadFolder
        open={isUploadFolderFormOpen}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        setFolderName={setFolderName}
        folderName={folderName}
        onClose={() => setIsUploadFolderFormOpen(false)}
        fetchUnSealedFolders={fetchUnSealedFolders}
        // fetchAdminPrivateFolders={fetchPrivateFolders}
      />
  </Box>
  )
}

export default ClientDocs