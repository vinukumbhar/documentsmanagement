import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { Box, Typography, IconButton } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";


const CreateFolder = () => {
    const templateId = "67ea43c004956fca8db1d445"
  
    useEffect(() => {
      console.log(templateId);
    }, [templateId]);
  
    const [structFolder, setStructFolder] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFolderId, setSelectedFolderId] = useState(null);
  
    useEffect(() => {
      if (templateId) {
        fetchUnSealedFolders();
      }
    }, [templateId]);
    const fetchUnSealedFolders = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/clients/unsealed/${templateId}`
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
    // const fetchFolders = async () => {
    //   try {
    //     const url = `http://localhost:8000/clients/filtereddocs/${templateId}`;
    //     const response = await axios.get(url);
  
    //     const addIsOpenProperty = (folders, parentId = null) =>
    //       folders.map((folder, index) => ({
    //         ...folder,
    //         isOpen: false, // Initially close all folders
    //         id: `${parentId ? `${parentId}-` : ""}${index}`,
    //         contents: folder.contents
    //           ? addIsOpenProperty(
    //               folder.contents,
    //               `${parentId ? `${parentId}-` : ""}${index}`
    //             )
    //           : [],
    //       }));
  
    //     const processedData = {
    //       ...response.data,
    //       folders: addIsOpenProperty(response.data.folders || []),
    //     };
  
    //     setStructFolder(processedData);
    //   } catch (err) {
    //     console.error("Error fetching all folders:", err);
    //     setError(err.message || "An error occurred");
    //   }
    // };
  
    // const renderContents = (contents, setContents) => {
    //   return contents.map((item, index) => {
    //     if (item.folder) {
    //       const toggleFolder = () => {
    //         const updatedContents = contents.map((folder, i) =>
    //           i === index ? { ...folder, isOpen: !folder.isOpen } : folder
    //         );
    //         setContents(updatedContents);
    //       };
  
    //       const selectFolder = () => setSelectedFolderId(item.id);
  
    //       return (
    //         <div key={index} style={{ marginLeft: "20px" }}>
    //           <div
    //             style={{
    //               cursor: "pointer",
    //               display: "flex",
    //               alignItems: "center",
  
    //             }}
    //             onClick={selectFolder}
    //           >
    //             <div onClick={toggleFolder}>
    //               {item.isOpen ? "📂" : "📁"} <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
    //             </div>
    //           </div>
    //           {item.isOpen && item.contents && item.contents.length > 0 && (
    //             <div>
    //               {renderContents(item.contents, (newContents) => {
    //                 const updatedFolders = contents.map((folder, i) =>
    //                   i === index ? { ...folder, contents: newContents } : folder
    //                 );
    //                 setContents(updatedFolders);
    //               })}
    //             </div>
    //           )}
    //         </div>
    //       );
    //     } else if (item.file) {
    //       return (
    //         <div key={index} style={{ marginLeft: "40px" }}>
    //           📄 {item.file}
    //         </div>
    //       );
    //     }
    //     return null;
    //   });
    // };
    // const clientrenderContents = (contents, setContents) => {
    //     return contents.flatMap((item, index) => {
    //       // Skip rendering the "unsealed" folder and show only its contents
    //       if (item.folder === "unsealed") {
    //         return clientrenderContents(item.contents || [], (newInnerContents) => {
    //           const updatedContents = contents.map((c, i) =>
    //             i === index ? { ...c, contents: newInnerContents } : c
    //           );
    //           setContents(updatedContents);
    //         });
    //       }
      
    //       if (item.folder) {
    //         const toggleFolder = () => {
    //           const updatedContents = contents.map((folder, i) =>
    //             i === index ? { ...folder, isOpen: !folder.isOpen } : folder
    //           );
    //           setContents(updatedContents);
    //         };
      
    //         const selectFolder = () => setSelectedFolderId(item.id);
      
    //         return (
    //           <div key={index} style={{ marginLeft: "20px" }}>
    //             <div
    //               style={{
    //                 cursor: "pointer",
    //                 display: "flex",
    //                 alignItems: "center",
    //               }}
    //               onClick={selectFolder}
    //             >
    //               <div onClick={toggleFolder}>
    //                 {item.isOpen ? "📂" : "📁"}{" "}
    //                 <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
    //               </div>
    //             </div>
    //             {item.isOpen && item.contents && item.contents.length > 0 && (
    //               <div>
    //                 {clientrenderContents(item.contents, (newContents) => {
    //                   const updatedFolders = contents.map((folder, i) =>
    //                     i === index ? { ...folder, contents: newContents } : folder
    //                   );
    //                   setContents(updatedFolders);
    //                 })}
    //               </div>
    //             )}
    //           </div>
    //         );
    //       } else if (item.file) {
    //         return (
    //           <div key={index} style={{ marginLeft: "40px" }}>
    //             📄 {item.file}
    //           </div>
    //         );
    //       }
    //       return null;
    //     });
    //   };
      
    // const clientrenderContents = (contents, setContents, depth = 0) => {
    //     return contents.flatMap((item, index) => {
    //       const indent = `${depth * 20}px`;
      
    //       if (item.folder === "unsealed") {
    //         return clientrenderContents(item.contents || [], (newInnerContents) => {
    //           const updatedContents = contents.map((c, i) =>
    //             i === index ? { ...c, contents: newInnerContents } : c
    //           );
    //           setContents(updatedContents);
    //         }, depth);
    //       }
      
    //       // Folder Rendering
    //       if (item.folder) {
    //         const toggleFolder = () => {
    //           const updatedContents = contents.map((folder, i) =>
    //             i === index ? { ...folder, isOpen: !folder.isOpen } : folder
    //           );
    //           setContents(updatedContents);
    //         };
      
    //         const selectFolder = () => setSelectedFolderId(item.id);
      
    //         return (
    //           <div key={item.id} style={{ marginLeft: indent }}>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 alignItems: "center",
    //                 justifyContent: "space-between",
    //                 backgroundColor: selectedFolderId === item.id ? "#e8f0fe" : "transparent",
    //                 padding: "6px 10px",
    //                 borderRadius: "6px",
    //                 transition: "background-color 0.2s ease",
    //                 cursor: "pointer",
    //                 border: "1px solid #f0f0f0",
    //                 marginBottom: "4px"
    //               }}
    //               onClick={selectFolder}
    //             >
    //               <div
    //                 style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
    //                 onClick={(e) => {
    //                   e.stopPropagation();
    //                   toggleFolder();
    //                 }}
    //               >
    //                 <span style={{ fontSize: "18px" }}>{item.isOpen ? "📂" : "📁"}</span>
    //                 <strong style={{ marginLeft: "8px", fontSize: "14px" }}>{item.folder}</strong>
    //               </div>
    //             </div>
      
    //             {/* Nested contents */}
    //             {item.isOpen && item.contents && item.contents.length > 0 && (
    //               <div>
    //                 {clientrenderContents(item.contents, (newContents) => {
    //                   const updatedFolders = contents.map((folder, i) =>
    //                     i === index ? { ...folder, contents: newContents } : folder
    //                   );
    //                   setContents(updatedFolders);
    //                 }, depth + 1)}
    //               </div>
    //             )}
    //           </div>
    //         );
    //       }
      
    //       // File Rendering
    //       if (item.file) {
    //         return (
    //           <div
    //             key={`${item.id}-${index}`}
    //             style={{
    //               marginLeft: `${(depth + 1) * 20}px`,
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "space-between",
    //               padding: "6px 10px",
    //               backgroundColor: "#fff",
    //               borderRadius: "6px",
    //               border: "1px solid #f0f0f0",
    //               marginBottom: "4px",
    //               transition: "background-color 0.2s ease"
    //             }}
    //           >
    //             <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
    //               <span style={{ fontSize: "18px", marginRight: "8px" }}>📄</span>
    //               <span style={{ fontSize: "14px" }}>{item.file}</span>
    //             </div>
    //           </div>
    //         );
    //       }
      
    //       return null;
    //     });
    //   };

    const renderContents = (contents, setContents) =>
      contents.map((item, index) => {
        if (item.folder) {
          const toggleFolder = () => {
            const updated = contents.map((f, i) =>
              i === index ? { ...f, isOpen: !f.isOpen } : f
            );
            setContents(updated);
          };
    
          const selectFolder = () => setSelectedFolderId(item.id);
    console.log("janavi",selectedFolderId)
          return (
            <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 8px",
                  borderRadius: "4px",
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
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
                  {/* <SealedChip sealed={item.sealed} /> */}
                </div>
                
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
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
            >
              <span style={{ marginRight: "8px" }}>📄</span>
              <span style={{ fontWeight: 500, flexGrow: 1 }}>{item.file}</span>
              {/* <SealedChip sealed={item.sealed} /> */}
              
            </div>
          );
        }
        return null;
      });
      
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    if (!structFolder) {
      return <div>Loading...</div>;
    }
  
    return (

        <>
        <Typography variant="h2" >CLIENT PORTAL</Typography>
         <Box >
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
              // htmlFor="fileInput"
              sx={{ color: "#e87800" }}
            >
              <HiDocumentArrowUp size={24} />
            </IconButton>
            <Typography
              variant="body1"
              component="label"
              // htmlFor="fileInput"
              sx={{ cursor: "pointer" }}
            >
              Upload Document
            </Typography>
            
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
            
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
            
          >
            <IconButton sx={{ color: "#e87800" }}>
              <MdOutlineDriveFolderUpload size={24} />
            </IconButton>
            <Typography variant="body1">Upload Folder</Typography>
            
          </Box>
        </Box>
      </Box>
        {renderContents(structFolder.folders, (newFolders) =>
          setStructFolder({ ...structFolder, folders: newFolders })
        )}
</Box>
        </>
    
  
    )
  }

export default CreateFolder;