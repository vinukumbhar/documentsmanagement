
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Button, IconButton, Box, Typography, Drawer } from "@mui/material";
// import { FaTimes } from "react-icons/fa";
// import JSZip from "jszip";
// const UploadDocument = ({  open, onClose, folderFiles, }) => {

//   const templateId = "67ea43c004956fca8db1d445"

//   useEffect(() => {
//     console.log(templateId);
//   }, [templateId]);
//   const [structFolder, setStructFolder] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedFolderId, setSelectedFolderId] = useState(null);
//   const [newFolderPath, setNewFolderPath] = useState("");
//   const [destinationPath, setDestinationPath] = useState("");



//     const fetchFolders = async () => {
//       try {
//         const url = `http://localhost:8000/allFolders/${templateId}`;
//         const response = await axios.get(url);
//         const addIsOpenProperty = (folders, parentId = null) =>
//           folders.map((folder, index) => ({
//             ...folder,
//             isOpen: false, // Set to false to close all folders initially
//             id: `${parentId ? `${parentId}-` : ""}${index}`,
//             contents: folder.contents
//               ? addIsOpenProperty(
//                   folder.contents,
//                   `${parentId ? `${parentId}-` : ""}${index}`
//                 )
//               : [],
//           }));

//         const processedData = {
//           ...response.data,
//           folders: addIsOpenProperty(response.data.folders || []),
//         };

//         setStructFolder(processedData);
//       } catch (err) {
//         console.error("Error fetching all folders:", err);
//         setError(err.message || "An error occurred");
//       }
//     };
//     useEffect(() => {
//       if (templateId) {
//         fetchFolders();
//       }
//     }, [templateId]);
 
//   useEffect(() => {
//     if (selectedFolderId) {
//       console.log("The selected folder ID has been updated:", selectedFolderId);
//       handleSelectFolderPath(); // Call your function that depends on the updated state
//     }
//   }, [selectedFolderId]);




//   const renderContents = (contents, setContents) => {
//     return contents.map((item, index) => {
//       if (item.folder) {
//         const toggleFolder = () => {
//           const updatedContents = contents.map((folder, i) =>
//             i === index ? { ...folder, isOpen: !folder.isOpen } : folder
//           );
//           setContents(updatedContents);
//         };

//         const selectFolder = () => setSelectedFolderId(item.id);

//         return (
//           <div key={index} style={{ marginLeft: "20px", marginBottom: "4px" }}>
//             <div
//               style={{
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "6px 8px",
//                 borderRadius: "4px",
//                 backgroundColor:
//                   selectedFolderId === item.id ? "#f0f7ff" : "transparent",
//                 transition: "background-color 0.2s ease",
//                 "&:hover": {
//                   backgroundColor: "#f5f5f5",
//                 },
//               }}
//               onClick={selectFolder}
//             >
//               <div
//                 onClick={toggleFolder}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   width: "100%",
//                 }}
//               >
//                 <span style={{ marginRight: "8px" }}>
//                   {item.isOpen ? "📂" : "📁"}
//                 </span>
//                 <strong
//                   style={{
//                     fontWeight: 500,
//                     color: "#333",
//                     fontSize: "14px",
//                   }}
//                 >
//                   {item.folder}
//                 </strong>
//               </div>
//             </div>
//             {item.isOpen && item.contents && item.contents.length > 0 && (
//               <div style={{ marginTop: "4px" }}>
//                 {renderContents(item.contents, (newContents) => {
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
//           <div
//             key={index}
//             style={{
//               marginLeft: "40px",
//               padding: "4px 8px",
//               fontSize: "14px",
//               color: "#555",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <span style={{ marginRight: "8px" }}>📄</span>
//             {item.file}
//           </div>
//         );
//       }
//       return null;
//     });
//   };
  // const handleSubmitFolder = async () => {
  //   if (!folderFiles || folderFiles.length === 0 || !destinationPath) {
  //     alert("Please select a folder and destination path before uploading.");
  //     return;
  //   }
  
  //   const firstFile = folderFiles[0];
  //   const folderPath = firstFile.webkitRelativePath;
  //   const folderName = folderPath.split("/")[0]; // Extract folder name
  
  //   console.log("Uploading folder...");
  //   console.log("folderFiles:", folderFiles);
  //   console.log("folderName:", folderName);
  //   console.log("destinationPath:", destinationPath);
  
  //   const zip = new JSZip();
  //   Array.from(folderFiles).forEach((file) => {
  //     const relativePath = file.webkitRelativePath.replace(`${folderName}/`, ""); // Maintain structure
  //     zip.file(relativePath, file);
  //   });
  
  //   const zipBlob = await zip.generateAsync({ type: "blob" });
  
  //   const formData = new FormData();
  //   formData.append("folderZip", zipBlob, `${folderName}.zip`); // Name ZIP after the folder
  //   formData.append("folderName", folderName);
  //   formData.append("destinationPath", destinationPath); // Add missing destination path
  
  //   console.log("FormData contents:");
  //   for (let pair of formData.entries()) {
  //     console.log(pair[0], pair[1]); // Log formData entries
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
  



// const handleSelectFolderPath = () => {
//     const getFolderPath = (folders, parentPath = "") => {
//       for (let folder of folders) {
//         const currentPath = `${parentPath}/${folder.folder}`;

//         if (folder.id === selectedFolderId) {
//           //(currentPath); // Set new folder path
//           return currentPath; // Immediately return the selected path
//         }

//         if (folder.contents) {
//           const nestedPath = getFolderPath(folder.contents, currentPath);
//           if (nestedPath) {
//             return nestedPath; // Return the nested path if found
//           }
//         }
//       }
//       return null; // No path found
//     };

//     if (!selectedFolderId || !structFolder?.folders) {
//       console.log("No folder selected or structure is not available.");
//       return;
//     }

//     setNewFolderPath(getFolderPath(structFolder.folders));
//     console.log("Selected path from function:", newFolderPath); // Debugging log
//   };

//   useEffect(() => {
//     if (newFolderPath) {
//       console.log("The folder path has changed to:", newFolderPath);
//       setDestinationPath(
//         `uploads/FolderTemplates/${templateId}/${newFolderPath}`
//       );
//       // Perform additional actions when newFolderPath changes
//     }
//   }, [newFolderPath]);

//   if (error) {
//     return <Box>Error: {error}</Box>;
//   }

//   if (!structFolder) {
//     return <Box>Loading...</Box>;
//   }

//   return (
//     <Drawer
//       anchor="right"
//       open={open}
//       onClose={onclose}
//       PaperProps={{
//         sx: {
//           width: 600,
         
//         },
//       }}
//     >
//       <Box>
        
//          <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           p: 2,
//           // padding:'5px 0 5px 0',
//           borderBottom: "1px solid grey",
//         }}
//       >
//         <Typography variant="h6">Select Folder to upload folder</Typography>
//         <FaTimes
//           style={{ cursor: "pointer" }}
//           onClick={onclose}
//         />
//       </Box>
//         <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
//                        {renderContents(structFolder.folders, (newFolders) =>
//                          setStructFolder({ ...structFolder, folders: newFolders })
//                        )}
//                      </Box>
        
//       </Box>

      // <Box sx={{ marginTop: 2, textAlign: "center" }}>
      //       <Button variant="contained" color="primary" onClick={handleSubmitFolder}>
      //         Upload to Selected Folder
      //       </Button>
      //     </Box>
//     </Drawer>
//   );
// };

// export default UploadDocument;


import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Drawer,
  IconButton,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import axios from "axios";
import JSZip from "jszip";
const UploadDocument = ({
  open,
  onClose,folderFiles,
  fetchUnSealedFolders,
  fetchAdminPrivateFolders,
}) => {
  const templateId = "67ea43c004956fca8db1d445";

  useEffect(() => {
    console.log(templateId);
  }, [templateId]);

  const [newFolderName, setNewFolderName] = useState("");

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
                  selectedFolderId === item.id && selectedType === "public"
                    ? "#f0f7ff"
                    : "transparent",

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
                  selectedFolderId === item.id && selectedType === "private"
                    ? "#f0f7ff"
                    : "transparent",

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
  // const createFolderAPI = (newFolderPath) => {
  //   return axios
  //     .get(
  //       `http://localhost:8000/createFolder/?path=uploads/FolderTemplates/${templateId}/${newFolderPath}&foldername=${newFolderName}`
  //     )
  //     .then((response) => {
  //       console.log("API Response:", response.data);
  //       //fetchFolders();
  //       //renderContents();
  //       return response.data;
  //       //setNewFolderName(""); // Clear input field
  //     })
  //     .catch((error) => {
  //       console.log("API Error:", error);
  //       throw error;
  //     });
  // };

  // const createFolderAPI = () => {
  //   if (!destinationPath || !newFolderName) {
  //     console.log("Missing path or folder name.");
  //     return;
  //   }
  
  //   return axios
  //     .get(
  //       `http://localhost:8000/createFolder/?path=${destinationPath}&foldername=${newFolderName}`
  //     )
  //     .then((response) => {
  //       console.log("API Response:", response.data);
  //       setNewFolderName(""); // Clear input
  //       onClose()
  //       fetchUnSealedFolders()
  //       fetchAdminPrivateFolders()

  //       return response.data;
  //     })
  //     .catch((error) => {
  //       console.log("API Error:", error);
  //       throw error;
  //     });
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
      onClose()
      console.log("Folder uploaded to:", response.data.path);
      fetchAdminPrivateFolders()
      fetchUnSealedFolders()
    } catch (error) {
      console.error("Error uploading folder:", error);
      alert("Folder upload failed!");
    }
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
      setDestinationPath(
        `uploads/FolderTemplates/${templateId}/${newFolderPath}`
      );
    }
  }, [newFolderPath, selectedType]);

  useEffect(() => {
    if (privateFolderPath && selectedType === "private") {
      setDestinationPath(
        `uploads/FolderTemplates/${templateId}/${privateFolderPath}`
      );
    }
  }, [privateFolderPath, selectedType]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!structFolder || !privateStructFolder) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Drawer anchor="right" open={open} onClose={onClose}>
        
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: "8px",

            padding: 2,
            width: 600,
            fontFamily:
              "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">upload folder</Typography>
            <IconButton onClick={onClose}>
              <MdClose />
            </IconButton>
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
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={handleSubmitFolder}>
              Upload to Selected Folder
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default UploadDocument;
