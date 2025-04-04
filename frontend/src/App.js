// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Input,
//   CircularProgress,
// } from "@mui/material";
// import CreateFolder from "./CreateFolder";
// import axios from "axios";
// import { FaRegFolderClosed } from "react-icons/fa6";
// import UploadDrawer from "./uploadDocumentWorking";
// import { HiDocumentArrowUp } from "react-icons/hi2";
// import { MdOutlineDriveFolderUpload } from "react-icons/md";
// import UploadFolder from "./folderUpload";
// const App = () => {
// const [isDocumentForm, setIsDocumentForm] = useState(false);
// const [file, setFile] = useState(null);
// const handleFileChange = async (e) => {
//   setFile(e.target.files[0]);
// };
// const handleFileUpload = () => {
//   setIsDocumentForm(true); // Open the drawer
// };

// const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
// const handleCreateFolderClick = () => {
//   setIsFolderFormOpen(!isFolderFormOpen);
// };

//   const [folderStructure, setFolderStructure] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedFolder, setSelectedFolder] = useState(null);

//   useEffect(() => {
//     fetchFoldersWithContents("67ea43c004956fca8db1d445");
//   }, []);
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
//         return {
//           ...folder,
//           contents: toggleFolderOpenState(folder.contents, folderId),
//         };
//       }
//       return folder;
//     });
//   };
//   const renderContents = (contents, parentPath = "") => {
//     return contents.map((item) => {
//       const currentPath = `${parentPath}/${item.folder || ""}`.replace(
//         "//",
//         "/"
//       );
//       console.log("janavi", currentPath);
//       if (item.folder) {
//         return (
//           <Box key={item.id} style={{ marginLeft: "20px" }}>
//             <Box
//               style={{
//                 cursor: "pointer",
//                 display: "flex",
//                 alignItems: "center",
//                 backgroundColor:
//                   selectedFolder === currentPath ? "#e0e0e0" : "transparent",
//                 padding: "4px",
//                 borderRadius: "4px",
//               }}
//               onClick={() => handleFolderClick(item.id, currentPath)}
//             >
//               {item.isOpen ? "📂" : "📁"}{" "}
//               <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
//             </Box>
//             {item.isOpen && item.contents.length > 0 && (
//               <Box>{renderContents(item.contents, currentPath)}</Box>
//             )}
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
//   const handleFolderClick = (folderId, folderPath) => {
//     // setNewFolderPath(folderPath);
//     console.log(folderPath);
//     setFolderStructure(toggleFolderOpenState(folderStructure, folderId));
//   };
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// const [folderFiles, setFolderFiles] = useState([]);
// // const folderInputRef = useRef(null);
// const [folderName, setFolderName] = useState("");
// //function related to folder

// const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
// const folderInputRef = useRef(null);

// const handleFolderSelection = (e) => {
//   // const files = Array.from(e.target.files);
//   // if (files.length > 0) {
//   //   setFolderFiles(files);
//   //   setIsDrawerOpen(true);
//   // }
//   const files = Array.from(e.target.files);
//   if (files.length > 0) {
//     // Extract folder name from the first file's path
//     const firstFilePath = files[0].webkitRelativePath;
//     const folderNameFromPath = firstFilePath.split("/")[0];
//     setFolderName(folderNameFromPath);
//     setFolderFiles(files);
//     setIsDrawerOpen(true);
//   }
//   e.target.value = ""; // Reset input
// };

// const openDrawer = () => {
//   console.log("jjanxad");
//   setIsUploadFolderFormOpen(!isUploadFolderFormOpen);
// };
// useEffect(() => {
//   if (isDrawerOpen) {
//     openDrawer();
//   }
// }, [isDrawerOpen]);
//   return (
//     <>
// <Box className="uploads-documents-links" sx={{ display: "flex", gap: 2 }}>
//   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//     <IconButton
//       component="label"
//       htmlFor="fileInput"
//       sx={{ color: "#e87800" }}
//     >
//       <HiDocumentArrowUp size={24} />
//     </IconButton>
//     <Typography
//       variant="body1"
//       component="label"
//       htmlFor="fileInput"
//       sx={{ cursor: "pointer" }}
//     >
//       Upload Document
//     </Typography>
//     <Input
//       type="file"
//       id="fileInput"
//       onChange={(e) => {
//         handleFileChange(e);
//         handleFileUpload();
//       }}
//       sx={{ display: "none" }}
//     />
//   </Box>

//   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//     <IconButton
//       //onClick={handleCreateFolderClick}
//       sx={{ color: "#e87800" }}
//     >
//       <FaRegFolderClosed size={20} />
//     </IconButton>
//     <Typography
//       variant="body1"
//       onClick={handleCreateFolderClick}
//       sx={{ cursor: "pointer" }}
//     >
//       Create Folder
//     </Typography>
//   </Box>
//   <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       gap: 1,
//       cursor: "pointer",
//     }}
//     onClick={() => folderInputRef.current.click()}
//   >
//     <IconButton
//       component="label"
//       htmlFor="folderInput"
//       sx={{ color: "#e87800" }}
//     >
//       <MdOutlineDriveFolderUpload size={24} />
//     </IconButton>

//     <Typography variant="body1">Upload Folder</Typography>
//     {/* Hidden folder input */}
//     <input
//       type="file"
//       ref={folderInputRef}
//       style={{ display: "none" }}
//       webkitdirectory="true"
//       directory="true"
//       onChange={handleFolderSelection}
//     />
//   </Box>
// </Box>

// {/* Hidden folder input */}
// <input
//   type="file"
//   ref={folderInputRef}
//   style={{ display: "none" }}
//   webkitdirectory="true"
//   directory="true"
//   onChange={handleFolderSelection}
// />

//       <Box mt={5}>
//         {loading ? (
//           <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
//         ) : folderStructure.length > 0 ? (
//           <Box>{renderContents(folderStructure)}</Box>
//         ) : (
//           <Typography variant="body2" sx={{ mt: 2, color: "gray" }}>
//             No folders found
//           </Typography>
//         )}
//       </Box>
// <UploadDrawer
//   open={isDocumentForm}
//   onClose={() => setIsDocumentForm(false)}
//   file={file}
// />
// <CreateFolder
//   open={isFolderFormOpen}
//   onClose={() => setIsFolderFormOpen(false)}
// />
// <UploadFolder
//   open={isUploadFolderFormOpen}
//   folderFiles={folderFiles}
//   setFolderFiles={setFolderFiles}
//   setFolderName={setFolderName}
//   folderName={folderName}
//   onClose={() => setIsUploadFolderFormOpen(false)}
// />
//     </>
//   );
// };

// export default App;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Input,
 
// } from "@mui/material";
// import CreateFolder from "./CreateFolder";
// import axios from "axios";
// import { FaRegFolderClosed } from "react-icons/fa6";
// import UploadDrawer from "./uploadDocumentWorking";
// import { HiDocumentArrowUp } from "react-icons/hi2";
// import { MdOutlineDriveFolderUpload } from "react-icons/md";
// import UploadFolder from "./folderUpload";



// const App = () => {
//   const [isDocumentForm, setIsDocumentForm] = useState(false);
//   const [file, setFile] = useState(null);
//   const handleFileChange = async (e) => {
//     setFile(e.target.files[0]);
//   };
//   const handleFileUpload = () => {
//     setIsDocumentForm(true); // Open the drawer
//   };

//   const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
//   const handleCreateFolderClick = () => {
//     setIsFolderFormOpen(!isFolderFormOpen);
//   };
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [folderFiles, setFolderFiles] = useState([]);
//   // const folderInputRef = useRef(null);
//   const [folderName, setFolderName] = useState("");
//   //function related to folder

//   const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
//   const folderInputRef = useRef(null);

//   const handleFolderSelection = (e) => {
   
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       // Extract folder name from the first file's path
//       const firstFilePath = files[0].webkitRelativePath;
//       const folderNameFromPath = firstFilePath.split("/")[0];
//       setFolderName(folderNameFromPath);
//       setFolderFiles(files);
//       setIsDrawerOpen(true);
//     }
//     e.target.value = ""; // Reset input
//   };

//   const openDrawer = () => {
//     console.log("jjanxad");
//     setIsUploadFolderFormOpen(!isUploadFolderFormOpen);
//   };
//   useEffect(() => {
//     if (isDrawerOpen) {
//       openDrawer();
//     }
//   }, [isDrawerOpen]);
//   const templateId = "67ea43c004956fca8db1d445";

//   useEffect(() => {
//     console.log(templateId);
//   }, [templateId]);

//   const [structFolder, setStructFolder] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedFolderId, setSelectedFolderId] = useState(null);

//   useEffect(() => {
//     if (templateId) {
//       fetchFolders();
//     }
//   }, [templateId]);

//   const fetchFolders = async () => {
//     try {
//       const url = `http://localhost:8000/allFolders/${templateId}`;
//       const response = await axios.get(url);

//       const addIsOpenProperty = (folders, parentId = null) =>
//         folders.map((folder, index) => ({
//           ...folder,
//           isOpen: false,
//           id: `${parentId ? `${parentId}-` : ""}${index}`,
//           contents: folder.contents
//             ? addIsOpenProperty(
//                 folder.contents,
//                 `${parentId ? `${parentId}-` : ""}${index}`
//               )
//             : [],
//         }));

//       const processedData = {
//         ...response.data,
//         folders: addIsOpenProperty(response.data.folders || []),
//       };

//       setStructFolder(processedData);
//     } catch (err) {
//       console.error("Error fetching all folders:", err);
//       setError(err.message || "An error occurred");
//     }
//   };

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

//   if (error) {
//     return (
//       <Box
//         sx={{
//           padding: "16px",
//           backgroundColor: "#fff",
//           borderRadius: "4px",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           color: "#d32f2f",
//         }}
//       >
//         Error: {error}
//       </Box>
//     );
//   }

//   if (!structFolder) {
//     return (
//       <Box
//         sx={{
//           padding: "16px",
//           backgroundColor: "#fff",
//           borderRadius: "4px",
//           boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
//           color: "#666",
//         }}
//       >
//         Loading...
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         backgroundColor: "#fff",
//         borderRadius: "8px",

//         padding: "16px",
//         maxWidth: "800px",
//         fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
//       }}
//     >
//       <Box className="uploads-documents-links" sx={{ display: "flex", gap: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <IconButton
//             component="label"
//             htmlFor="fileInput"
//             sx={{ color: "#e87800" }}
//           >
//             <HiDocumentArrowUp size={24} />
//           </IconButton>
//           <Typography
//             variant="body1"
//             component="label"
//             htmlFor="fileInput"
//             sx={{ cursor: "pointer" }}
//           >
//             Upload Document
//           </Typography>
//           <Input
//             type="file"
//             id="fileInput"
//             onChange={(e) => {
//               handleFileChange(e);
//               handleFileUpload();
//             }}
//             sx={{ display: "none" }}
//           />
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <IconButton
//             //onClick={handleCreateFolderClick}
//             sx={{ color: "#e87800" }}
//           >
//             <FaRegFolderClosed size={20} />
//           </IconButton>
//           <Typography
//             variant="body1"
//             onClick={handleCreateFolderClick}
//             sx={{ cursor: "pointer" }}
//           >
//             Create Folder
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: 1,
//             cursor: "pointer",
//           }}
//           onClick={() => folderInputRef.current.click()}
//         >
//           <IconButton
//             component="label"
//             htmlFor="folderInput"
//             sx={{ color: "#e87800" }}
//           >
//             <MdOutlineDriveFolderUpload size={24} />
//           </IconButton>

//           <Typography variant="body1">Upload Folder</Typography>
//           {/* Hidden folder input */}
//           <input
//             type="file"
//             ref={folderInputRef}
//             style={{ display: "none" }}
//             webkitdirectory="true"
//             directory="true"
//             onChange={handleFolderSelection}
//           />
//         </Box>
//       </Box>

//       {/* Hidden folder input */}
//       <input
//         type="file"
//         ref={folderInputRef}
//         style={{ display: "none" }}
//         webkitdirectory="true"
//         directory="true"
//         onChange={handleFolderSelection}
//       />

//       <Typography
//         variant="h6"
//         sx={{
//           marginBottom: "16px",
//           color: "#333",
//           fontWeight: 600,
//           fontSize: "18px",
//         }}
//       >
//         Folder Structure
//       </Typography>
//       <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
//         {renderContents(structFolder.folders, (newFolders) =>
//           setStructFolder({ ...structFolder, folders: newFolders })
//         )}
//       </Box>

//       <UploadDrawer
//         open={isDocumentForm}
//         onClose={() => setIsDocumentForm(false)}
//         file={file}
//       />
//       <CreateFolder
//         open={isFolderFormOpen}
//         onClose={() => setIsFolderFormOpen(false)}
//       />
//       <UploadFolder
//         open={isUploadFolderFormOpen}
//         folderFiles={folderFiles}
//         setFolderFiles={setFolderFiles}
//         setFolderName={setFolderName}
//         folderName={folderName}
//         onClose={() => setIsUploadFolderFormOpen(false)}
//       />
//     </Box>
//   );
// };
// export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

const CreateFolder = () => {
  const templateId = "67ea43c004956fca8db1d445";
  const [structFolder, setStructFolder] = useState(null);
  const [error, setError] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  useEffect(() => {
    if (templateId) {
      fetchFolders();
    }
  }, [templateId]);

  const fetchFolders = async () => {
    try {
      const url = `http://localhost:8000/allFolders/${templateId}`;
      const response = await axios.get(url);

      const addIsOpenProperty = (folders, parentId = null) =>
        folders.map((folder, index) => ({
          ...folder,
          isOpen: false,
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

  const fetchClientUploadsContent = async () => {
    try {
      setLoadingContent(true);
  
      const [sealedResponse, unsealedResponse] = await Promise.all([
        axios.get(`http://localhost:8000/getSealedContent/${templateId}`),
        axios.get(`http://localhost:8000/getUnsealedContent/${templateId}`),
      ]);
  
      const tagSourceRecursively = (items, source, parentId = "") =>
        items.map((item, index) => {
          const id = `${parentId}${index}`;
          if (item.type === "folder") {
            return {
              folder: item.name,
              isOpen: false,
              id,
              source,
              contents: tagSourceRecursively(item.contents || [], source, id + "-"),
            };
          } else {
            return {
              file: item.name,
              id,
              source,
            };
          }
        });
  
      const sealed = tagSourceRecursively(sealedResponse.data.contents || [], "sealed");
      const unsealed = tagSourceRecursively(unsealedResponse.data.contents || [], "unsealed");
  
      return [...sealed, ...unsealed];
    } catch (error) {
      console.error("Error fetching content:", error);
      return [];
    } finally {
      setLoadingContent(false);
    }
  };
  
  const SealedChip = ({ source }) => {
    if (!source) return null;
  
    const isSealed = source === "sealed";
    return (
      <span
        style={{
          marginLeft: "8px",
          fontSize: "0.75em",
          padding: "2px 6px",
          borderRadius: "10px",
          backgroundColor: isSealed ? "#ffebee" : "#e8f5e9",
          color: isSealed ? "#c62828" : "#2e7d32",
          border: `1px solid ${isSealed ? "#c62828" : "#2e7d32"}`,
        }}
      >
        {isSealed ? "Sealed" : "Unsealed"}
      </span>
    );
  };
  
  // const fetchClientUploadsContent = async () => {
  //   try {
  //     setLoadingContent(true);
  
  //     const [sealedResponse, unsealedResponse] = await Promise.all([
  //       axios.get(`http://localhost:8000/getSealedContent/${templateId}`),
  //       axios.get(`http://localhost:8000/getUnsealedContent/${templateId}`),
  //     ]);
  
  //     const allContent = [
  //       ...(sealedResponse.data.contents || []).map(item => ({ ...item, isSealed: true })),
  //       ...(unsealedResponse.data.contents || []).map(item => ({ ...item, isSealed: false })),
  //     ];
  
  //     // Recursive function to transform the structure
  //     const addIsOpenProperty = (items, parentId = "") =>
  //       items.map((item, index) => {
  //         const id = `${parentId}${index}`;
  //         if (item.type === "folder") {
  //           return {
  //             folder: item.name,
  //             isOpen: false,
  //             id,
  //             contents: addIsOpenProperty(item.contents || [], id + "-"),
  //           };
  //         } else {
  //           return {
  //             file: item.name,
  //             isSealed: item.isSealed || false,
  //             id,
  //           };
  //         }
  //       });
  
  //     const structured = addIsOpenProperty(allContent);
  
  //     return structured;
  //   } catch (error) {
  //     console.error("Error fetching content:", error);
  //     return [];
  //   } finally {
  //     setLoadingContent(false);
  //   }
  // };
  
  // const fetchClientUploadsContent = async () => {
  //   try {
  //     setLoadingContent(true);
  //     const [sealedResponse, unsealedResponse] = await Promise.all([
  //       axios.get(`http://localhost:8000/getSealedContent/${templateId}`),
  //       axios.get(`http://localhost:8000/getUnsealedContent/${templateId}`),
  //     ]);

  //     return [
  //       ...(sealedResponse.data.contents || []).map(item => ({
  //         ...item,
  //         file: item.name,
  //         isSealed: true
  //       })),
  //       ...(unsealedResponse.data.contents || []).map(item => ({
  //         ...item,
  //         file: item.name,
  //         isSealed: false
  //       }))
  //     ];
  //   } catch (error) {
  //     console.error("Error fetching content:", error);
  //     return [];
  //   } finally {
  //     setLoadingContent(false);
  //   }
  // };

  const handleFolderToggle = async (item, index, contents, setContents) => {
    // If this is the Client Uploaded Documents folder and it's being opened
    if (item.folder === "Client Uploaded Documents" && !item.isOpen) {
      const clientUploadsContent = await fetchClientUploadsContent();

      const updatedContents = contents.map((folder, i) => {
        if (i === index) {
          return {
            ...folder,
            isOpen: !folder.isOpen,
            contents: clientUploadsContent
          };
        }
        return folder;
      });

      setContents(updatedContents);
    } else {
      // Normal folder toggle behavior
      const updatedContents = contents.map((folder, i) =>
        i === index ? { ...folder, isOpen: !folder.isOpen } : folder
      );
      setContents(updatedContents);
    }
  };

  // const renderContents = (contents, setContents, depth = 0) => {
  //   return contents.map((item, index) => {
  //     if (item.folder) {
  //       const toggleFolder = () => handleFolderToggle(item, index, contents, setContents);
  //       const selectFolder = () => setSelectedFolderId(item.id);

  //       return (
  //         <div key={item.id} style={{ marginLeft: `${depth * 20}px` }}>
  //           <div
  //             style={{
  //               cursor: "pointer",
  //               display: "flex",
  //               alignItems: "center",
  //               backgroundColor: selectedFolderId === item.id ? "#f0f0f0" : "transparent",
  //               padding: "5px",
  //               borderRadius: "4px"
  //             }}
  //             onClick={selectFolder}
  //           >
  //             <div onClick={(e) => { e.stopPropagation(); toggleFolder(); }}>
  //               {item.isOpen ? "📂" : "📁"} 
  //               <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
  //               {item.folder === "Client Uploaded Documents" && loadingContent && (
  //                 <span style={{ marginLeft: "8px", fontSize: "0.8em" }}>Loading...</span>
  //               )}
  //             </div>
  //           </div>
  //           {item.isOpen && item.contents && item.contents.length > 0 && (
  //             <div>
  //               {renderContents(item.contents, (newContents) => {
  //                 const updatedFolders = contents.map((folder, i) =>
  //                   i === index ? { ...folder, contents: newContents } : folder
  //                 );
  //                 setContents(updatedFolders);
  //               }, depth + 1)}
  //             </div>
  //           )}
  //         </div>
  //       );
  //     } else if (item.file) {
  //       return (
  //         <div 
  //           key={`${item.id}-${index}`} 
  //           style={{ 
  //             marginLeft: `${(depth + 1) * 20}px`,
  //             display: "flex",
  //             alignItems: "center",
  //             padding: "3px 0",
  //             color: item.isSealed ? "#d32f2f" : "#388e3c"
  //           }}
  //         >
  //           {item.isSealed ? "🔒" : "📄"} {item.file}
  //         </div>
  //       );
  //     }
  //     return null;
  //   });
  // };


  

  

  // const renderContents = (contents, setContents, depth = 0) => {
  //   return contents.map((item, index) => {
  //     if (item.folder) {
  //       const toggleFolder = () => handleFolderToggle(item, index, contents, setContents);
  //       const selectFolder = () => setSelectedFolderId(item.id);
  
  //       return (
  //         <div key={item.id} style={{ marginLeft: `${depth * 20}px` }}>
  //           <div
  //             style={{
  //               cursor: "pointer",
  //               display: "flex",
  //               alignItems: "center",
  //               backgroundColor: selectedFolderId === item.id ? "#f0f0f0" : "transparent",
  //               padding: "5px",
  //               borderRadius: "4px"
  //             }}
  //             onClick={selectFolder}
  //           >
  //             <div
  //               onClick={(e) => {
  //                 e.stopPropagation();
  //                 toggleFolder();
  //               }}
  //               style={{ display: "flex", alignItems: "center" }}
  //             >
  //               <span style={{ marginRight: "5px" }}>
  //                 {item.isOpen ? "📂" : "📁"}
  //               </span>
  //               <strong>{item.folder}</strong>
  //               {item.folder === "Client Uploaded Documents" && loadingContent && (
  //                 <span style={{ marginLeft: "8px", fontSize: "0.8em" }}>Loading...</span>
  //               )}
  //             </div>
  //           </div>
  //           {item.isOpen && item.contents && item.contents.length > 0 && (
  //             <div>
  //               {renderContents(item.contents, (newContents) => {
  //                 const updatedFolders = contents.map((folder, i) =>
  //                   i === index ? { ...folder, contents: newContents } : folder
  //                 );
  //                 setContents(updatedFolders);
  //               }, depth + 1)}
  //             </div>
  //           )}
  //         </div>
  //       );
  //     } else if (item.file) {
  //       return (
  //         <div
  //           key={`${item.id}-${index}`}
  //           style={{
  //             marginLeft: `${(depth + 1) * 20}px`,
  //             display: "flex",
  //             alignItems: "center",
  //             padding: "3px 0",
  //             color: "#333"
  //           }}
  //         >
  //           <span style={{ marginRight: "5px" }}>📄</span> {item.file}
  //         </div>
  //       );
  //     }
  //     return null;
  //   });
  // };

  const renderContents = (contents, setContents, depth = 0) => {
    return contents.map((item, index) => {
      // FOLDER RENDERING
      if (item.folder) {
        const toggleFolder = () => handleFolderToggle(item, index, contents, setContents);
        const selectFolder = () => setSelectedFolderId(item.id);
  
        return (
          <div key={item.id} style={{ marginLeft: `${depth * 20}px` }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                backgroundColor: selectedFolderId === item.id ? "#f0f0f0" : "transparent",
                padding: "5px",
                borderRadius: "4px"
              }}
              onClick={selectFolder}
            >
              <div onClick={(e) => { e.stopPropagation(); toggleFolder(); }}>
                {item.isOpen ? "📂" : "📁"}
                <strong style={{ marginLeft: "5px" }}>{item.folder}</strong>
                <SealedChip source={item.source} />
                {item.folder === "Client Uploaded Documents" && loadingContent && (
                  <span style={{ marginLeft: "8px", fontSize: "0.8em" }}>Loading...</span>
                )}
              </div>
            </div>
  
            {/* CHILD FOLDERS & FILES */}
            {item.isOpen && item.contents && item.contents.length > 0 && (
              <div>
                {renderContents(item.contents, (newContents) => {
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
  
      // FILE RENDERING
      else if (item.file) {
        return (
          <div
            key={`${item.id}-${index}`}
            style={{
              marginLeft: `${(depth + 1) * 20}px`,
              display: "flex",
              alignItems: "center",
              padding: "3px 0",
              color: "#333"
            }}
          >
            <span style={{ marginRight: "5px" }}>📄</span>
            {item.file}
            <SealedChip source={item.source} />
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
    <Box>
      {renderContents(structFolder.folders, (newFolders) =>
        setStructFolder({ ...structFolder, folders: newFolders })
      )}
    </Box>
  );
};

export default CreateFolder;