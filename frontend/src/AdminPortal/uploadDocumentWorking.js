// // src/components/UploadDrawer.js
// import React, { useEffect, useState } from "react";
// import { Box, Typography, Drawer, IconButton ,CircularProgress,Button } from "@mui/material";
// import { MdClose } from "react-icons/md";
// import axios from "axios";
// const UploadDrawer = ({ open, onClose, file }) => {
//   const [folderStructure, setFolderStructure] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   useEffect(() => {
//     if (open) {
//       fetchFoldersWithContents("67ea43c004956fca8db1d445");
//     }
//   }, [open]);
//   // const fetchFoldersWithContents = async () => {
//   //   setLoading(true);
//   //   try {
//   //     const response = await axios.get("http://localhost:8000/getFoldersWithContents");
//   //     setFolderStructure(response.data.folders);
//   //   } catch (error) {
//   //     console.error("Error fetching folder structure:", error);
//   //   }
//   //   setLoading(false);
//   // };
//   const fetchFoldersWithContents = async (id) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/allFolders/${id}`
//       );
//       setFolderStructure(response.data.folders);
//     } catch (error) {
//       console.error("Error fetching folder structure:", error);
//     }
//     setLoading(false);
//   };
//   // Recursive function to update folder open state while keeping all data
//   const toggleFolderOpenState = (folders, folderId) => {
//     return folders.map((folder) => {
//       if (folder.id === folderId) {
//         return { ...folder, isOpen: !folder.isOpen };
//       } else if (folder.contents) {
//         return { ...folder, contents: toggleFolderOpenState(folder.contents, folderId) };
//       }
//       return folder;
//     });
//   };
//    // Function to render folder & file contents
//   //  const renderContents = (contents) => {
//   //   return contents.map((item, index) => {
//   //     if (item.folder) {
//   //       return (
//   //         <Box key={item.id} style={{ marginLeft: "20px" }}>
//   //           <Box
//   //             style={{
//   //               cursor: "pointer",
//   //               display: "flex",
//   //               alignItems: "center",
//   //             }}
//   //             onClick={() => setFolderStructure(toggleFolderOpenState(folderStructure, item.id))}
//   //           >
//   //             {item.isOpen ? "📂" : "📁"}{" "}
//   //             <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
//   //           </Box>
//   //           {item.isOpen && item.contents.length > 0 && <Box>{renderContents(item.contents)}</Box>}
//   //         </Box>
//   //       );
//   //     } else if (item.file) {
//   //       return (
//   //         <Box key={item.id} style={{ marginLeft: "40px" }}>
//   //           📄 {item.file}
//   //         </Box>
//   //       );
//   //     }
//   //     return null;
//   //   });
//   // };
//   const renderContents = (contents, parentPath = "") => {
//     return contents.map((item) => {
//       const currentPath = `${parentPath}/${item.folder || ""}`.replace("//", "/");

//       if (item.folder) {
//         return (
//           <Box key={item.id} style={{ marginLeft: "20px" }}>
//             <Box
//               style={{
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor: selectedFolder === currentPath ? "#e0e0e0" : "transparent",
//                 padding: "4px",
//                 borderRadius: "4px",
//               }}
//               onClick={() => handleFolderClick(item.id, currentPath)}
//             >
//               {item.isOpen ? "📂" : "📁"} <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
//             </Box>
//             {item.isOpen && item.contents.length > 0 && <Box>{renderContents(item.contents, currentPath)}</Box>}
//           </Box>
//         );
//       } else if (item.file) {
//         return (
//           <Box key={item.id} style={{ marginLeft: "40px" }}>
//             📄 {item.file}
//           </Box>
//         );
//       }
//       return null;
//     });
//   };
//   const [newFolderPath, setNewFolderPath] = useState("");
//   const handleFolderClick = (folderId, folderPath) => {
//     setNewFolderPath(folderPath);
//     console.log(folderPath)
//     setFolderStructure(toggleFolderOpenState(folderStructure, folderId));
//   };
//   // const handleUpload = async () => {
//   //   if (!file || !selectedFolder) {
//   //     alert("Please select a file and a folder first.");
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append("file", file);
//   //   formData.append("destinationPath", selectedFolder);

//   //   try {
//   //     const response = await axios.post("http://localhost:8000/uploadfile", formData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });

//   //     alert(response.data.message);
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //     alert("File upload failed!");
//   //   }
//   // };
//   const [destinationPath, setDestinationPath] = useState("");

//   useEffect(() => {
//     if (newFolderPath) {
//       console.log("The folder path has changed to:", newFolderPath);
//       setDestinationPath(
//         `uploads/${newFolderPath}`
//       );
//       // Perform additional actions when newFolderPath changes
//     }
//   }, [newFolderPath]);
//   const handleUpload = async () => {
//     let data = new FormData();
//     data.append("destinationPath", destinationPath);
//     data.append("file", file);

//     let config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: `http://localhost:8000/uploadfile`,
//       data: data,

//     };
//     axios
//     .request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
//       alert("File uploaded successfully!");

//     })
//     .catch((error) => {
//       console.error(error);
//       alert("Failed to upload the file.");
//     });

//   };

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       <Box sx={{ width: 600, padding: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h6">Upload Document</Typography>
//           <IconButton onClick={onClose}>
//             <MdClose />
//           </IconButton>
//         </Box>
//         {loading ? (
//           <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
//         ) : folderStructure.length > 0 ? (
//           <Box>{renderContents(folderStructure)}</Box>
//         ) : (
//           <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
//             No folders found
//           </Typography>
//         )}

//           <Box sx={{ marginTop: 2, textAlign: "center" }}>
//             <Button variant="contained" color="primary" onClick={handleUpload}>
//               Upload to Selected Folder
//             </Button>
//           </Box>

//       </Box>
//     </Drawer>
//   );
// };

// export default UploadDrawer;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, IconButton, Box, Typography, Drawer } from "@mui/material";
import { FaTimes } from "react-icons/fa";

const UploadDocument = ({ open, onClose, file ,fetchUnSealedFolders,fetchAdminPrivateFolders}) => {
  const templateId = "67ea43c004956fca8db1d445";

  useEffect(() => {
    console.log(templateId);
  }, [templateId]);
  const [structFolder, setStructFolder] = useState(null);
  const [privateStructFolder, setPrivateStructFolder] = useState(null);
  const [privateFolderPath, setPrivateFolderPath] = useState("");
  const [error, setError] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [newFolderPath, setNewFolderPath] = useState("");
  const [destinationPath, setDestinationPath] = useState("");

  const fetchFolders = async () => {
    try {
      const url = `http://127.0.0.1:8000/admin/clientDocs/${templateId}`;
      const response = await axios.get(url);
      const addIsOpenProperty = (folders, parentId = null) =>
        folders.map((folder, index) => ({
          ...folder,
          isOpen: false, // Set to false to close all folders initially
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
  const fetchPrivateFolders = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/admin/privateDocs/${templateId}`
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
  useEffect(() => {
    if (templateId) {
      fetchFolders();
      fetchPrivateFolders();
    }
  }, [templateId]);

  useEffect(() => {
    if (selectedFolderId) {
      console.log("The selected folder ID has been updated:", selectedFolderId);
      handleSelectFolderPath(); // Call your function that depends on the updated state
    }
  }, [selectedFolderId]);

 
  const [selectedType, setSelectedType] = useState(null); // "public" or "private"


  const renderContents = (contents, setContents) => {
    return contents.map((item, index) => {
      if (item.folder) {
        const toggleFolder = () => {
          const updatedContents = contents.map((folder, i) =>
            i === index ? { ...folder, isOpen: !folder.isOpen } : folder
          );
          setContents(updatedContents);
        };

        // const selectFolder = () => setSelectedFolderId(item.id);
        const selectFolder = () => {
          setSelectedFolderId(item.id);
          setSelectedType("public");
        };
        

        return (
          <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "6px 8px",
                borderRadius: "4px",
                // backgroundColor:
                //   selectedFolderId === item.id ? "#f0f7ff" : "transparent",
                backgroundColor:
  selectedFolderId === item.id && selectedType === "public" ? "#f0f7ff" : "transparent",


                transition: "background-color 0.2s ease",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
              onClick={selectFolder}
            >
              <div
                onClick={toggleFolder}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                  {item.isOpen ? "📂" : "📁"}
                </span>
                <strong
                  style={{
                    fontWeight: 500,
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {item.folder}
                </strong>
              </div>
            </div>
            {item.isOpen && item.contents && item.contents.length > 0 && (
              <div style={{ marginTop: "4px" }}>
                {renderContents(item.contents, (newContents) => {
                  const updatedFolders = contents.map((folder, i) =>
                    i === index ? { ...folder, contents: newContents } : folder
                  );
                  setContents(updatedFolders);
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
            {item.file}
          </div>
        );
      }
      return null;
    });
  };

  const renderPrivateContents = (contents, setContents) => {
    return contents.map((item, index) => {
      if (item.folder) {
        const toggleFolder = () => {
          const updatedContents = contents.map((folder, i) =>
            i === index ? { ...folder, isOpen: !folder.isOpen } : folder
          );
          setContents(updatedContents);
        };
  
        // const selectFolder = () => setSelectedFolderId(item.id);
        const selectFolder = () => {
          setSelectedFolderId(item.id);
          setSelectedType("private");
        };
        
  
        return (
          <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "6px 8px",
                borderRadius: "4px",
                backgroundColor:
  selectedFolderId === item.id && selectedType === "private" ? "#f0f7ff" : "transparent",


                // backgroundColor:
                //   selectedFolderId === item.id ? "#f0f7ff" : "transparent",
                transition: "background-color 0.2s ease",
              }}
              onClick={selectFolder}
            >
              <div
                onClick={toggleFolder}
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                  {item.isOpen ? "📂" : "📁"}
                </span>
                <strong
                  style={{
                    fontWeight: 500,
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  {item.folder}
                </strong>
              </div>
            </div>
            {item.isOpen && item.contents && item.contents.length > 0 && (
              <div style={{ marginTop: "4px" }}>
                {renderPrivateContents(item.contents, (newContents) => {
                  const updatedFolders = contents.map((folder, i) =>
                    i === index ? { ...folder, contents: newContents } : folder
                  );
                  setContents(updatedFolders);
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
            {item.file}
          </div>
        );
      }
      return null;
    });
  };
  
  const handleSubmitfile = async (e) => {
    let data = new FormData();
    data.append("destinationPath", destinationPath);
    data.append("file", file);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:8000/uploadfile",
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert("File uploaded successfully!");
        onClose()
        fetchUnSealedFolders();
        fetchAdminPrivateFolders();
        setSelectedFolderId(null)
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to upload the file.");
      });

 
  };
  const handleSelectFolderPath = () => {
    const getFolderPath = (folders, parentPath = "") => {
      for (let folder of folders) {
        const currentPath = `${parentPath}/${folder.folder}`;
  
        if (folder.id === selectedFolderId) {
          return currentPath;
        }
  
        if (folder.contents) {
          const nestedPath = getFolderPath(folder.contents, currentPath);
          if (nestedPath) {
            return nestedPath;
          }
        }
      }
      return null;
    };
  
    if (!selectedFolderId || !selectedType) {
      console.log("No folder selected or type not defined.");
      return;
    }
  
    // if (selectedType === "public" && structFolder?.folders) {
    //   const selectedPath = getFolderPath(structFolder.folders);
    //   setNewFolderPath(selectedPath);
    //   console.log("Selected public path:", selectedPath);
    // }

    if (selectedType === "public" && structFolder?.folders) {
      let selectedPath = getFolderPath(structFolder.folders);
    
      // Append /unsealed if the selected folder is "Client Uploaded Documents"
      // if (selectedPath === "/Client Uploaded Documents") {
      //   selectedPath += "/unsealed";
      // }
         // Inject "unsealed" if path starts with "/Client Uploaded Documents"
    if (selectedPath?.startsWith("/Client Uploaded Documents")) {
      selectedPath = selectedPath.replace(
        "/Client Uploaded Documents",
        "/Client Uploaded Documents/unsealed"
      );
    }
    
      setNewFolderPath(selectedPath);
      console.log("Selected public path:", selectedPath);
    }
    
  
    if (selectedType === "private" && privateStructFolder?.folders) {
      const selectedPath = getFolderPath(privateStructFolder.folders);
      setPrivateFolderPath(selectedPath);
      console.log("Selected private path:", selectedPath);
    }
  };


  useEffect(() => {
    if (newFolderPath && selectedType === "public") {
      setDestinationPath(`uploads/FolderTemplates/${templateId}/${newFolderPath}`);
    }
  }, [newFolderPath, selectedType]);
  
  useEffect(() => {
    if (privateFolderPath && selectedType === "private") {
      setDestinationPath(`uploads/FolderTemplates/${templateId}/${privateFolderPath}`);
    }
  }, [privateFolderPath, selectedType]);
  
  if (error) {
    return <Box>Error: {error}</Box>;
  }

  if (!structFolder || !privateStructFolder) {
    return <Box>Loading...</Box>;
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 600,
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            // padding:'5px 0 5px 0',
            borderBottom: "1px solid grey",
          }}
        >
          <Typography variant="h6">Select Folder to upload</Typography>
          <FaTimes style={{ cursor: "pointer" }} onClick={onclose} />
        </Box>
        <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
         
          {renderContents(structFolder.folders, (newFolders) =>
                 setStructFolder({ ...structFolder, folders: newFolders })
               )}
         

          {renderPrivateContents(privateStructFolder.folders, (newFolders) =>
  setPrivateStructFolder({
    ...privateStructFolder,
    folders: newFolders,
  })
)}

        </Box>
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", gap: 2, mt: 3, ml: 4 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={!file}
          onClick={() => {
            handleSelectFolderPath();
            handleSubmitfile();
          }}
        >
          Upload
        </Button>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
};

export default UploadDocument;
