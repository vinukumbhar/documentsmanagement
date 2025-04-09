

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  Input,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

// Dummy components - replace these with your actual components
import UploadDrawer from "./uploadDocumentWorking";
import CreateFolder from "./CreateFolder";
import UploadFolder from "./folderUpload";
import DocumentManager from "../DocumentManager";
import UploadDoc from "../Firm Docs Shared With Client/UplodDoc";
import CreateFolderInFirm from "../Firm Docs Shared With Client/CreateFolder";
const App = () => {
  const [isDocumentForm, setIsDocumentForm] = useState(false);
  const [file, setFile] = useState(null);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const [isFolderCreate, setIsFolderCreate] = useState(false);
  const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [folderFiles, setFolderFiles] = useState([]);
  const [folderName, setFolderName] = useState("");
  const folderInputRef = useRef(null);
  const [uploadDocOpen, setUplaodDocOpen] = useState(false);
  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNewFileChange = (e) => setFile(e.target.files[0]);
  const handleFileUpload = () => setIsDocumentForm(true);
  const handleOpenDrawer = () => setUplaodDocOpen(true);
  const handleCreateFolderClick = () => setIsFolderFormOpen((prev) => !prev);
  const handleNewFolderClick = () => setIsFolderCreate((prev) => !prev);
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

  const [anchorEl, setAnchorEl] = useState(null);
  const [contextItem, setContextItem] = useState(null);
  const [structFolder, setStructFolder] = useState(null);
  const [sealedStructFolder, setSealedStructFolder] = useState(null);
  const [privateStructFolder, setPrivateStructFolder] = useState(null);
  const [firmDocsFolder, setFirmDocsFolder] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
 const [combinedFolderStructure,setCombinedFolderStructure]=useState(null)

  const templateId = "67ea43c004956fca8db1d445";

  useEffect(() => {
    if (templateId) {
      fetchUnSealedFolders();
      fetchSealedFolders();
      fetchPrivateFolders();
      fetchFrimDocsFolders()
    }
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

  const fetchSealedFolders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/admin/sealedFolders/${templateId}`
      );
      const folders = res.data.folders || [];

      const addIsOpen = (items, parentId = "") =>
        items.map((folder, index) => ({
          ...folder,
          isOpen: false,
          id: `${parentId}${index}`,
          sealed: true,
          contents: folder.contents
            ? addIsOpen(folder.contents, `${parentId}${index}-`)
            : [],
        }));

      setSealedStructFolder({ ...res.data, folders: addIsOpen(folders) });
    } catch (err) {
      setError(err.message || "Error fetching sealed folders.");
    }
  };

  useEffect(() => {
    fetchBothFolders();
  }, [templateId]);
  
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
          isOpen: true,
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
  
  const fetchPrivateFolders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/admin/privateDocs/${templateId}`
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

      setPrivateStructFolder({ ...res.data, folders: addIsOpen(folders) });
    } catch (err) {
      setError(err.message || "Error fetching sealed folders.");
    }
  };
  const fetchFrimDocsFolders = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/admin/firmDocs/${templateId}`
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

        setFirmDocsFolder({ ...res.data, folders: addIsOpen(folders) });
    } catch (err) {
      setError(err.message || "Error fetching sealed folders.");
    }
  };
  const SealedChip = ({ sealed }) => {
    if (sealed == null) return null;
    return (
      <span
        style={{
          marginLeft: "8px",
          fontSize: "0.75em",
          padding: "2px 6px",
          borderRadius: "10px",
          backgroundColor: sealed ? "#1976d3" : "",
          color: "#fff",
        }}
      >
        {sealed ? "Sealed" : ""}
      </span>
    );
  };
 

  const handleMenuClick = (e, item) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setContextItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setContextItem(null);
  };

  const handleMenuAction = (action) => {
    console.log(`${action} clicked`, contextItem);
    handleMenuClose();
  };
  const renderPrivateFolderContents = (contents, setContents) =>
    contents.map((item, index) => {
      if (item.folder) {
        const toggleFolder = () => {
          const updated = contents.map((f, i) =>
            i === index ? { ...f, isOpen: !f.isOpen } : f
          );
          setContents(updated);
        };

        const selectFolder = () => setSelectedFolderId(item.id);

        return (
          <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "6px 8px",
                borderRadius: "4px",
              }}
              onClick={selectFolder}
            >
              <div
                onClick={toggleFolder}
                style={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                <span style={{ marginRight: "8px" }}>
                  {item.isOpen ? "📂" : "📁"}
                </span>
                <strong style={{ fontWeight: 500 }}>{item.folder}</strong>
                {/* <SealedChip sealed={item.sealed} /> */}
              </div>
            </div>
            {item.isOpen && item.contents?.length > 0 && (
              <div style={{ marginTop: "4px" }}>
                {renderPrivateFolderContents(item.contents, (newContents) => {
                  const updated = contents.map((f, i) =>
                    i === index ? { ...f, contents: newContents } : f
                  );
                  setContents(updated);
                })}
              </div>
            )}
          </div>
        );
      } else if (item.file) {
        return (
          <div
            key={index}
            style={{
              marginLeft: "40px",
              padding: "4px 8px",
              fontSize: "14px",
              color: "#555",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: "8px" }}>📄</span>
            <span style={{ fontWeight: 500 }}>{item.file}</span>
            {/* <SealedChip sealed={item.sealed} /> */}
          </div>
        );
      }
      return null;
    });
    const renderFirmDocsFolderContents = (contents, setContents) =>
      contents.map((item, index) => {
        if (item.folder) {
          const toggleFolder = () => {
            const updated = contents.map((f, i) =>
              i === index ? { ...f, isOpen: !f.isOpen } : f
            );
            setContents(updated);
          };
  
          const selectFolder = () => setSelectedFolderId(item.id);
  
          return (
            <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 8px",
                  borderRadius: "4px",
                }}
                onClick={selectFolder}
              >
                <div
                  onClick={toggleFolder}
                  style={{ display: "flex", alignItems: "center", width: "100%" }}
                >
                  <span style={{ marginRight: "8px" }}>
                    {item.isOpen ? "📂" : "📁"}
                  </span>
                  <strong style={{ fontWeight: 500 }}>{item.folder}</strong>
                  {/* <SealedChip sealed={item.sealed} /> */}
                </div>
              </div>
              {item.isOpen && item.contents?.length > 0 && (
                <div style={{ marginTop: "4px" }}>
                  {renderFirmDocsFolderContents(item.contents, (newContents) => {
                    const updated = contents.map((f, i) =>
                      i === index ? { ...f, contents: newContents } : f
                    );
                    setContents(updated);
                  })}
                </div>
              )}
            </div>
          );
        } else if (item.file) {
          return (
            <div
              key={index}
              style={{
                marginLeft: "40px",
                padding: "4px 8px",
                fontSize: "14px",
                color: "#555",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "8px" }}>📄</span>
              <span style={{ fontWeight: 500 }}>{item.file}</span>
              {/* <SealedChip sealed={item.sealed} /> */}
            </div>
          );
        }
        return null;
      });
      const renderContents = (contents, setContents) => {
        if (!Array.isArray(contents)) return null; // Guard clause
      
        return contents.map((item, index) => {
          if (item.folder) {
            const toggleFolder = () => {
              const updated = contents.map((f, i) =>
                i === index ? { ...f, isOpen: !f.isOpen } : f
              );
              setContents(updated);
            };
      
            const selectFolder = () => setSelectedFolderId(item.id);
            console.log("janavi", selectedFolderId);
      
            return (
              <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    padding: "6px 8px",
                    borderRadius: "4px",
                    backgroundColor: selectedFolderId === item.id ? "#e0f7fa" : "transparent",
                  }}
                  onClick={selectFolder}
                >
                  <div
                    onClick={toggleFolder}
                    style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                  >
                    <span style={{ marginRight: "8px" }}>
                      {item.isOpen ? "📂" : "📁"}
                    </span>
                    <strong style={{ fontWeight: 500 }}>{item.folder}</strong>
                    <SealedChip sealed={item.sealed} />
                  </div>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, item);
                    }}
                  >
                    <BsThreeDotsVertical />
                  </IconButton>
                </div>
                {item.isOpen && item.contents?.length > 0 && (
                  <div style={{ marginTop: "4px" }}>
                    {renderContents(item.contents, (newContents) => {
                      const updated = contents.map((f, i) =>
                        i === index ? { ...f, contents: newContents } : f
                      );
                      setContents(updated);
                    })}
                  </div>
                )}
              </div>
            );
          } else if (item.file) {
            // Construct the file URL
            const fileUrl = item.filePath || `http://localhost:8000/uploads/${item.file}`;
      
            return (
              <div
                key={index}
                style={{
                  marginLeft: "40px",
                  padding: "4px 8px",
                  fontSize: "14px",
                  color: "#555",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "8px" }}>📄</span>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 500,
                    flexGrow: 1,
                    textDecoration: "none",
                    color: "#555",
                  }}
                >
                  {item.file}
                </a>
                <SealedChip sealed={item.sealed} />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMenuClick(e, item);
                  }}
                >
                  <BsThreeDotsVertical />
                </IconButton>
              </div>
            );
          }
      
          return null;
        });
      };
      
      // const renderContents = (contents, setContents) => {
      //   if (!Array.isArray(contents)) return null; // ✅ Guard clause to avoid .map on null
      
      //   return contents.map((item, index) => {
      //     if (item.folder) {
      //       const toggleFolder = () => {
      //         const updated = contents.map((f, i) =>
      //           i === index ? { ...f, isOpen: !f.isOpen } : f
      //         );
      //         setContents(updated);
      //       };
      
      //       const selectFolder = () => setSelectedFolderId(item.id);
      //       console.log("janavi", selectedFolderId);
      
      //       return (
      //         <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
      //           <div
      //             style={{
      //               cursor: "pointer",
      //               display: "flex",
      //               alignItems: "center",
      //               padding: "6px 8px",
      //               borderRadius: "4px",
      //               '&:hover': {
      //                 backgroundColor: '#f5f5f5',
      //               },
      //             }}
      //             onClick={selectFolder}
      //           >
      //             <div
      //               onClick={toggleFolder}
      //               style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
      //             >
      //               <span style={{ marginRight: "8px" }}>
      //                 {item.isOpen ? "📂" : "📁"}
      //               </span>
      //               <strong style={{ fontWeight: 500 }}>{item.folder}</strong>
      //               <SealedChip sealed={item.sealed} />
      //             </div>
      //             <IconButton
      //               size="small"
      //               onClick={(e) => {
      //                 e.stopPropagation();
      //                 handleMenuClick(e, item);
      //               }}
      //             >
      //               <BsThreeDotsVertical />
      //             </IconButton>
      //           </div>
      //           {item.isOpen && item.contents?.length > 0 && (
      //             <div style={{ marginTop: "4px" }}>
      //               {renderContents(item.contents, (newContents) => {
      //                 const updated = contents.map((f, i) =>
      //                   i === index ? { ...f, contents: newContents } : f
      //                 );
      //                 setContents(updated);
      //               })}
      //             </div>
      //           )}
      //         </div>
      //       );
      //     } else if (item.file) {
      //       return (
      //         <div
      //           key={index}
      //           style={{
      //             marginLeft: "40px",
      //             padding: "4px 8px",
      //             fontSize: "14px",
      //             color: "#555",
      //             display: "flex",
      //             alignItems: "center",
      //             '&:hover': {
      //               backgroundColor: '#f5f5f5',
      //             },
      //           }}
      //         >
      //           <span style={{ marginRight: "8px" }}>📄</span>
      //           <span style={{ fontWeight: 500, flexGrow: 1 }}>{item.file}</span>
      //           <SealedChip sealed={item.sealed} />
      //           <IconButton
      //             size="small"
      //             onClick={(e) => {
      //               e.stopPropagation();
      //               handleMenuClick(e, item);
      //             }}
      //           >
      //             <BsThreeDotsVertical />
      //           </IconButton>
      //         </div>
      //       );
      //     }
      
      //     return null;
      //   });
      // };
      
  // const renderContents = (contents, setContents) =>
  //   contents.map((item, index) => {
  //     if (item.folder) {
  //       const toggleFolder = () => {
  //         const updated = contents.map((f, i) =>
  //           i === index ? { ...f, isOpen: !f.isOpen } : f
  //         );
  //         setContents(updated);
  //       };
  
  //       const selectFolder = () => setSelectedFolderId(item.id);
  // console.log("janavi",selectedFolderId)
  //       return (
  //         <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
  //           <div
  //             style={{
  //               cursor: "pointer",
  //               display: "flex",
  //               alignItems: "center",
  //               padding: "6px 8px",
  //               borderRadius: "4px",
  //               '&:hover': {
  //                 backgroundColor: '#f5f5f5',
  //               },
  //             }}
  //             onClick={selectFolder}
  //           >
  //             <div
  //               onClick={toggleFolder}
  //               style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
  //             >
  //               <span style={{ marginRight: "8px" }}>
  //                 {item.isOpen ? "📂" : "📁"}
  //               </span>
  //               <strong style={{ fontWeight: 500 }}>{item.folder}</strong>
  //               <SealedChip sealed={item.sealed} />
  //             </div>
  //             <IconButton
  //               size="small"
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 handleMenuClick(e, item);
  //               }}
  //             >
  //               <BsThreeDotsVertical />
  //             </IconButton>
  //           </div>
  //           {item.isOpen && item.contents?.length > 0 && (
  //             <div style={{ marginTop: "4px" }}>
  //               {renderContents(item.contents, (newContents) => {
  //                 const updated = contents.map((f, i) =>
  //                   i === index ? { ...f, contents: newContents } : f
  //                 );
  //                 setContents(updated);
  //               })}
  //             </div>
  //           )}
  //         </div>
  //       );
  //     } else if (item.file) {
  //       return (
  //         <div
  //           key={index}
  //           style={{
  //             marginLeft: "40px",
  //             padding: "4px 8px",
  //             fontSize: "14px",
  //             color: "#555",
  //             display: "flex",
  //             alignItems: "center",
  //             '&:hover': {
  //               backgroundColor: '#f5f5f5',
  //             },
  //           }}
  //         >
  //           <span style={{ marginRight: "8px" }}>📄</span>
  //           <span style={{ fontWeight: 500, flexGrow: 1 }}>{item.file}</span>
  //           <SealedChip sealed={item.sealed} />
  //           <IconButton
  //             size="small"
  //             onClick={(e) => {
  //               e.stopPropagation();
  //               handleMenuClick(e, item);
  //             }}
  //           >
  //             <BsThreeDotsVertical />
  //           </IconButton>
  //         </div>
  //       );
  //     }
  //     return null;
  //   });
  const [clientFiles, setClientFiles] = useState([]);
 
  // useEffect(() => {
  //   const fetchFileDetails = async () => {
  //     try {
  //       const response = await axios.get("http://127.0.0.1:8000/api/files");
  //       if (response.data.success) {
         
  //         const basePath = "Firm Docs Shared With Client";
  //         const filtered = response.data.data
  //           .filter((file) => file.filePath.includes(basePath))
  //           .map((file) => {
  //             const pathParts = file.filePath.split(basePath);
  //             return {
  //               ...file,
  //               filePath: basePath + (pathParts[1] || ""),
  //             };
  //           });

  //         setClientFiles(filtered);
  //         console.log(
  //           "Filtered Files Under Firm Docs Shared With Client:",
  //           filtered
  //         );
  //       } else {
  //         setError("Failed to fetch files");
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   fetchFileDetails();
  // }, []);
  const [data, setData] = useState({ folder: "", contents: [] });
  const [selectedPath, setSelectedPath] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://127.0.0.1:8000/admin/firmDocs/67ea43c004956fca8db1d445"
      );
      if (response.data && response.data.folder) {
        setData({
          folder: response.data.folder,
          contents: response.data.contents,
        });
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!combinedFolderStructure || !privateStructFolder) return <div>Loading...</div>;

  return (
    <>
      <Typography variant="h2">ADMIN PORTAL</Typography>

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

      <Box >
       
        {/* {renderContents(sealedStructFolder.folders, (newFolders) =>
          setSealedStructFolder({ ...sealedStructFolder, folders: newFolders })
        )}
        {renderContents(structFolder.folders, (newFolders) =>
          setStructFolder({ ...structFolder, folders: newFolders })
        )} */}
        {renderContents(combinedFolderStructure, (newStructure) =>
  setCombinedFolderStructure(newStructure)
)}

      </Box>
      <Box>
        {/* <Typography variant="h6">Private</Typography> */}

        {renderPrivateFolderContents(privateStructFolder.folders, (newFolders) =>
          setPrivateStructFolder({
            ...privateStructFolder,
            folders: newFolders,
          })
        )}
      </Box>
{/* <Divider /> */}
<Box sx={{mt:2, borderBottom:'2px solid grey'}}>

</Box>
      <Box>
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
                htmlFor="firmDocFileInput"
                sx={{ color: "#e87800" }}
              >
                <HiDocumentArrowUp size={24} />
              </IconButton>
              <Typography
                variant="body1"
                component="label"
                htmlFor="firmDocFileInput"
                sx={{ cursor: "pointer" }}
              >
                Upload Document in firm
              </Typography>
              <Input
                type="file"
                id="firmDocFileInput"
                onChange={(e) => {
                  handleNewFileChange(e);
                  handleOpenDrawer();
                }}
                sx={{ display: "none" }}
              />
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                onClick={handleNewFolderClick}
                sx={{ color: "#e87800" }}
              >
                <FaRegFolderClosed size={20} />
              </IconButton>
              <Typography variant="body1" sx={{ cursor: "pointer" }}>
                Create Folder in firm
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <Typography variant="h6">Firm Docs Shared With Client</Typography> */}
         
          <DocumentManager
        folderName={data.folder}
        contents={data.contents}
        onPathSelect={(path) => setSelectedPath(path)}
        selectedPath={selectedPath}
      />
          
        </Box>
      </Box>

      <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
>
  <MenuItem onClick={() => handleMenuAction("Edit")}>Edit</MenuItem>
  <MenuItem onClick={() => handleMenuAction("Delete")}>Delete</MenuItem>
  <MenuItem onClick={() => handleMenuAction(contextItem?.sealed ? "Unseal" : "Seal")}>
    {contextItem?.sealed ? "Unseal" : "Seal"}
  </MenuItem>
</Menu>
      {/* ADMIN UPLAOD DOC DRAER */}
      <UploadDrawer
        open={isDocumentForm}
        onClose={() => setIsDocumentForm(false)}
        file={file}
        fetchUnSealedFolders={fetchUnSealedFolders}
        fetchAdminPrivateFolders={fetchPrivateFolders}
      />
      {/* FIRM DOCS SHARED WITH CLIENT UPLOAD DOC DRAWER */}
      <UploadDoc
        open={uploadDocOpen}
        onClose={() => setUplaodDocOpen(false)}
        file={file}
      />
      {/* ADMIN CREATE FOLDER DRAWER */}
      <CreateFolder
        open={isFolderFormOpen}
        onClose={() => setIsFolderFormOpen(false)}
        fetchUnSealedFolders={fetchUnSealedFolders}
        fetchAdminPrivateFolders={fetchPrivateFolders}
      />
      {/* FIRM DOCS SHARED WITH CLIENT CREATE FOLDER DRAWER */}
      <CreateFolderInFirm
        open={isFolderCreate}
        onClose={() => setIsFolderCreate(false)}
      />
      {/* ADMIN UPLAOD FOLDER */}
      <UploadFolder
        open={isUploadFolderFormOpen}
        folderFiles={folderFiles}
        setFolderFiles={setFolderFiles}
        setFolderName={setFolderName}
        folderName={folderName}
        onClose={() => setIsUploadFolderFormOpen(false)}
        fetchUnSealedFolders={fetchUnSealedFolders}
        fetchAdminPrivateFolders={fetchPrivateFolders}
      />
    </>
  );
};

export default App;
