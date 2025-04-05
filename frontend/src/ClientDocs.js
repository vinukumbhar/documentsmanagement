import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Paper } from "@mui/material";
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
        fetchFolders();
      }
    }, [templateId]);
  
    const fetchFolders = async () => {
      try {
        const url = `http://localhost:8000/clients/filtereddocs/${templateId}`;
        const response = await axios.get(url);
  
        const addIsOpenProperty = (folders, parentId = null) =>
          folders.map((folder, index) => ({
            ...folder,
            isOpen: false, // Initially close all folders
            id: `${parentId ? `${parentId}-` : ""}${index}`,
            contents: folder.contents
              ? addIsOpenProperty(
                  folder.contents,
                  `${parentId ? `${parentId}-` : ""}${index}`
                )
              : [],
          }));
  
        const processedData = {
          ...response.data,
          folders: addIsOpenProperty(response.data.folders || []),
        };
  
        setStructFolder(processedData);
      } catch (err) {
        console.error("Error fetching all folders:", err);
        setError(err.message || "An error occurred");
      }
    };
  
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
      
    const clientrenderContents = (contents, setContents, depth = 0) => {
        return contents.flatMap((item, index) => {
          const indent = `${depth * 20}px`;
      
          if (item.folder === "unsealed") {
            return clientrenderContents(item.contents || [], (newInnerContents) => {
              const updatedContents = contents.map((c, i) =>
                i === index ? { ...c, contents: newInnerContents } : c
              );
              setContents(updatedContents);
            }, depth);
          }
      
          // Folder Rendering
          if (item.folder) {
            const toggleFolder = () => {
              const updatedContents = contents.map((folder, i) =>
                i === index ? { ...folder, isOpen: !folder.isOpen } : folder
              );
              setContents(updatedContents);
            };
      
            const selectFolder = () => setSelectedFolderId(item.id);
      
            return (
              <div key={item.id} style={{ marginLeft: indent }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: selectedFolderId === item.id ? "#e8f0fe" : "transparent",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    transition: "background-color 0.2s ease",
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    marginBottom: "4px"
                  }}
                  onClick={selectFolder}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFolder();
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.isOpen ? "📂" : "📁"}</span>
                    <strong style={{ marginLeft: "8px", fontSize: "14px" }}>{item.folder}</strong>
                  </div>
                </div>
      
                {/* Nested contents */}
                {item.isOpen && item.contents && item.contents.length > 0 && (
                  <div>
                    {clientrenderContents(item.contents, (newContents) => {
                      const updatedFolders = contents.map((folder, i) =>
                        i === index ? { ...folder, contents: newContents } : folder
                      );
                      setContents(updatedFolders);
                    }, depth + 1)}
                  </div>
                )}
              </div>
            );
          }
      
          // File Rendering
          if (item.file) {
            return (
              <div
                key={`${item.id}-${index}`}
                style={{
                  marginLeft: `${(depth + 1) * 20}px`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 10px",
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #f0f0f0",
                  marginBottom: "4px",
                  transition: "background-color 0.2s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
                  <span style={{ fontSize: "18px", marginRight: "8px" }}>📄</span>
                  <span style={{ fontSize: "14px" }}>{item.file}</span>
                </div>
              </div>
            );
          }
      
          return null;
        });
      };
      
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
  
  {clientrenderContents(structFolder.folders, (newFolders) =>
    setStructFolder({ ...structFolder, folders: newFolders })
  )}

</Box>
        </>
    
  
    )
  }

export default CreateFolder;