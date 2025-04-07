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
// const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// const [folderFiles, setFolderFiles] = useState([]);
// // const folderInputRef = useRef(null);
// const [folderName, setFolderName] = useState("");
// //function related to folder

// const [isUploadFolderFormOpen, setIsUploadFolderFormOpen] = useState(false);
// const folderInputRef = useRef(null);

// const handleFolderSelection = (e) => {

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
// const templateId = "67ea43c004956fca8db1d445";

// useEffect(() => {
//   console.log(templateId);
// }, [templateId]);

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
// <Box
//   sx={{
//     backgroundColor: "#fff",
//     borderRadius: "8px",

//     padding: "16px",
//     maxWidth: "800px",
//     fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
//   }}
// >
//   <Box className="uploads-documents-links" sx={{ display: "flex", gap: 2 }}>
//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       <IconButton
//         component="label"
//         htmlFor="fileInput"
//         sx={{ color: "#e87800" }}
//       >
//         <HiDocumentArrowUp size={24} />
//       </IconButton>
//       <Typography
//         variant="body1"
//         component="label"
//         htmlFor="fileInput"
//         sx={{ cursor: "pointer" }}
//       >
//         Upload Document
//       </Typography>
//       <Input
//         type="file"
//         id="fileInput"
//         onChange={(e) => {
//           handleFileChange(e);
//           handleFileUpload();
//         }}
//         sx={{ display: "none" }}
//       />
//     </Box>

//     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//       <IconButton
//         //onClick={handleCreateFolderClick}
//         sx={{ color: "#e87800" }}
//       >
//         <FaRegFolderClosed size={20} />
//       </IconButton>
//       <Typography
//         variant="body1"
//         onClick={handleCreateFolderClick}
//         sx={{ cursor: "pointer" }}
//       >
//         Create Folder
//       </Typography>
//     </Box>
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         cursor: "pointer",
//       }}
//       onClick={() => folderInputRef.current.click()}
//     >
//       <IconButton
//         component="label"
//         htmlFor="folderInput"
//         sx={{ color: "#e87800" }}
//       >
//         <MdOutlineDriveFolderUpload size={24} />
//       </IconButton>

//       <Typography variant="body1">Upload Folder</Typography>
//       {/* Hidden folder input */}
//       <input
//         type="file"
//         ref={folderInputRef}
//         style={{ display: "none" }}
//         webkitdirectory="true"
//         directory="true"
//         onChange={handleFolderSelection}
//       />
//     </Box>
//   </Box>

//   {/* Hidden folder input */}
//   <input
//     type="file"
//     ref={folderInputRef}
//     style={{ display: "none" }}
//     webkitdirectory="true"
//     directory="true"
//     onChange={handleFolderSelection}
//   />

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
//     </Box>
//   );
// };
// export default App;

// import React, { useEffect, useState,useRef } from "react";
// import axios from "axios";
// // import CreateFolder from "./CreateFolder";
// // import axios from "axios";
// import { FaRegFolderClosed } from "react-icons/fa6";
// // import UploadDrawer from "./uploadDocumentWorking";
// import { HiDocumentArrowUp } from "react-icons/hi2";
// import { MdOutlineDriveFolderUpload } from "react-icons/md";
// // import UploadFolder from "./folderUpload";
// import { Box ,Typography,Input} from "@mui/material";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { IconButton, Menu, MenuItem } from "@mui/material";
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

//   const [anchorEl, setAnchorEl] = useState(null);
//   const [contextItem, setContextItem] = useState(null);

//   const handleMenuClick = (event, item) => {
//     event.stopPropagation(); // Prevent folder toggle
//     setAnchorEl(event.currentTarget);
//     setContextItem(item);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setContextItem(null);
//   };

//   const handleMenuAction = (action) => {
//     console.log(`${action} clicked`, contextItem);
//     handleMenuClose();
//   };
//   const templateId = "67ea43c004956fca8db1d445";
//   const [structFolder, setStructFolder] = useState(null);
//   const [sealedStructFolder, setSealedStructFolder] = useState(null);
//   const [error, setError] = useState(null);
//   const [selectedFolderId, setSelectedFolderId] = useState(null);
//   const [loadingContent, setLoadingContent] = useState(false);

//   useEffect(() => {
//     if (templateId) {
//       fetchUnSealedFolders();
//       fetchSealedFolders()
//     }
//   }, [templateId]);

//   const fetchUnSealedFolders = async () => {
//     try {
//       const url = `http://localhost:8000/admin/unsealed/${templateId}`;
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
// console.log("all folders", processedData)
//       setStructFolder(processedData);
//     } catch (err) {
//       console.error("Error fetching all folders:", err);
//       setError(err.message || "An error occurred");
//     }
//   };

//   const fetchSealedFolders = async () => {
//     try {
//       const url = `http://localhost:8000/admin/sealedFolders/${templateId}`;
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
// console.log("all folders", processedData)
// setSealedStructFolder(processedData);
//     } catch (err) {
//       console.error("Error fetching all folders:", err);
//       setError(err.message || "An error occurred");
//     }
//   };

//   const fetchClientUploadsContent = async () => {
//     try {
//       setLoadingContent(true);

//       const [sealedResponse, unsealedResponse] = await Promise.all([
//         axios.get(`http://localhost:8000/getSealedContent/${templateId}`),
//         axios.get(`http://localhost:8000/getUnsealedContent/${templateId}`),
//       ]);

//       const tagSourceRecursively = (items, source, parentId = "") =>
//         items.map((item, index) => {
//           const id = `${parentId}${index}`;
//           if (item.type === "folder") {
//             return {
//               folder: item.name,
//               isOpen: false,
//               id,
//               source,
//               contents: tagSourceRecursively(
//                 item.contents || [],
//                 source,
//                 id + "-"
//               ),
//             };
//           } else {
//             return {
//               file: item.name,
//               id,
//               source,
//             };
//           }
//         });

//       const sealed = tagSourceRecursively(
//         sealedResponse.data.contents || [],
//         "sealed"
//       );
//       const unsealed = tagSourceRecursively(
//         unsealedResponse.data.contents || [],
//         "unsealed"
//       );

//       return [...sealed, ...unsealed];
//     } catch (error) {
//       console.error("Error fetching content:", error);
//       return [];
//     } finally {
//       setLoadingContent(false);
//     }
//   };

//   const SealedChip = ({ source }) => {
//     if (!source) return null;

//     const isSealed = source === "sealed";
//     return (
//       <span
//         style={{
//           marginLeft: "8px",
//           fontSize: "0.75em",
//           padding: "2px 6px",
//           borderRadius: "10px",
//           backgroundColor: "#1976d3",
//           color: "#fff",
//           // border: `1px solid ${isSealed ? "#c62828" : "#2e7d32"}`,
//         }}
//       >
//         {isSealed ? "Sealed" : "Unsealed"}
//       </span>
//     );
//   };

//   const handleFolderToggle = async (item, index, contents, setContents) => {
//     // If this is the Client Uploaded Documents folder and it's being opened
//     if (item.folder === "Client Uploaded Documents" && !item.isOpen) {
//       const clientUploadsContent = await fetchClientUploadsContent();

//       const updatedContents = contents.map((folder, i) => {
//         if (i === index) {
//           return {
//             ...folder,
//             isOpen: !folder.isOpen,
//             contents: clientUploadsContent,
//           };
//         }
//         return folder;
//       });

//       setContents(updatedContents);
//     } else {
//       // Normal folder toggle behavior
//       const updatedContents = contents.map((folder, i) =>
//         i === index ? { ...folder, isOpen: !folder.isOpen } : folder
//       );
//       setContents(updatedContents);
//     }
//   };

//   const renderContents = (contents, setContents, depth = 0) => {
//     return contents.map((item, index) => {
//       const indent = `${depth * 20}px`;

//       // FOLDER
//       if (item.folder) {
//         const toggleFolder = () => handleFolderToggle(item, index, contents, setContents);
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
//                 <SealedChip source={item.source} />
//                 {item.folder === "Client Uploaded Documents" && loadingContent && (
//                   <span style={{ marginLeft: "8px", fontSize: "0.8em", color: "#666" }}>Loading...</span>
//                 )}
//               </div>

//               <IconButton
//                 size="small"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleMenuClick(e, item);
//                 }}
//                 sx={{ ml: 1 }}
//               >
//                 <BsThreeDotsVertical />
//               </IconButton>
//             </div>

//             {/* RECURSIVE CHILD CONTENT */}
//             {item.isOpen && item.contents && item.contents.length > 0 && (
//               <div>
//                 {renderContents(
//                   item.contents,
//                   (newContents) => {
//                     const updatedFolders = contents.map((folder, i) =>
//                       i === index ? { ...folder, contents: newContents } : folder
//                     );
//                     setContents(updatedFolders);
//                   },
//                   depth + 1
//                 )}
//               </div>
//             )}
//           </div>
//         );
//       }

//       // FILE
//       else if (item.file) {
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
//               <SealedChip source={item.source} />
//             </div>

//             <IconButton
//               size="small"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleMenuClick(e, item);
//               }}
//               sx={{ ml: 1 }}
//             >
//               <BsThreeDotsVertical />
//             </IconButton>
//           </div>
//         );
//       }

//       return null;
//     });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!structFolder) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
// <Typography variant="h2">ADMIN PORTAL</Typography>
//     <Box
//     sx={{
//       backgroundColor: "#fff",
//       borderRadius: "8px",

//       padding: "16px",
//       maxWidth: "800px",
//       fontFamily: "'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
//     }}
//   >
//     <Box className="uploads-documents-links" sx={{ display: "flex", gap: 2 }}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <IconButton
//           component="label"
//           htmlFor="fileInput"
//           sx={{ color: "#e87800" }}
//         >
//           <HiDocumentArrowUp size={24} />
//         </IconButton>
//         <Typography
//           variant="body1"
//           component="label"
//           htmlFor="fileInput"
//           sx={{ cursor: "pointer" }}
//         >
//           Upload Document
//         </Typography>
//         <Input
//           type="file"
//           id="fileInput"
//           onChange={(e) => {
//             handleFileChange(e);
//             handleFileUpload();
//           }}
//           sx={{ display: "none" }}
//         />
//       </Box>

//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <IconButton
//           //onClick={handleCreateFolderClick}
//           sx={{ color: "#e87800" }}
//         >
//           <FaRegFolderClosed size={20} />
//         </IconButton>
//         <Typography
//           variant="body1"
//           onClick={handleCreateFolderClick}
//           sx={{ cursor: "pointer" }}
//         >
//           Create Folder
//         </Typography>
//       </Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 1,
//           cursor: "pointer",
//         }}
//         onClick={() => folderInputRef.current.click()}
//       >
//         <IconButton
//           component="label"
//           htmlFor="folderInput"
//           sx={{ color: "#e87800" }}
//         >
//           <MdOutlineDriveFolderUpload size={24} />
//         </IconButton>

//         <Typography variant="body1">Upload Folder</Typography>
//         {/* Hidden folder input */}
//         <input
//           type="file"
//           ref={folderInputRef}
//           style={{ display: "none" }}
//           webkitdirectory="true"
//           directory="true"
//           onChange={handleFolderSelection}
//         />
//       </Box>
//     </Box>

//     {/* Hidden folder input */}
//     <input
//       type="file"
//       ref={folderInputRef}
//       style={{ display: "none" }}
//       webkitdirectory="true"
//       directory="true"
//       onChange={handleFolderSelection}
//     />
//     </Box>
//     {/* <UploadDrawer
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
//       /> */}
//     <Box>
//       <h4>Client Uploaded Documents</h4>
//       {renderContents(sealedStructFolder.folders, (newFolders) =>

//        sealedStructFolder({...sealedStructFolder,folders: newFolders})
//      )}
//       {renderContents(structFolder.folders, (newFolders) =>
//         setStructFolder({ ...structFolder, folders: newFolders })

//       )}

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={() => handleMenuAction("New Folder")}>
//           New Folder
//         </MenuItem>
//         <MenuItem onClick={() => handleMenuAction("Edit")}>Edit</MenuItem>

//         {/* {contextItem?.folder !== "Client Uploaded Documents" && (
//           <MenuItem onClick={() => handleMenuAction("Move")}>Move</MenuItem>
//         )} */}

// <MenuItem
//   onClick={() => contextItem?.folder !== "Client Uploaded Documents" && handleMenuAction("Move")}
//   disabled={contextItem?.folder === "Client Uploaded Documents"}
// >
//   Move
// </MenuItem>

//         {(contextItem?.file ||
//           (contextItem?.folder &&
//             contextItem?.folder !== "Client Uploaded Documents" &&
//             contextItem?.folder !== "Private" &&
//             contextItem?.folder !== "Firm Docs Shared With Client")) && (
//           <MenuItem onClick={() => handleMenuAction("Seal/Unseal")}>
//             {contextItem?.source === "sealed" ? "Unseal" : "Seal"}
//           </MenuItem>
//         )}

//         {/* {contextItem?.folder !== "Client Uploaded Documents" && (
//           <MenuItem onClick={() => handleMenuAction("Delete")}>Delete</MenuItem>
//         )} */}
//         <MenuItem
//   onClick={() => contextItem?.folder !== "Client Uploaded Documents" && handleMenuAction("Delete")}
//   disabled={contextItem?.folder === "Client Uploaded Documents"}
// >
//   Delete
// </MenuItem>
//       </Menu>
//     </Box>
//     </>
//   );
// };

// export default App;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  IconButton,
  Input,
  Menu,
  MenuItem,
} from "@mui/material";
import { HiDocumentArrowUp } from "react-icons/hi2";
import { FaRegFolderClosed } from "react-icons/fa6";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

// Dummy components - replace these with your actual components
import UploadDrawer from "./uploadDocumentWorking";
import CreateFolder from "./CreateFolder";
import UploadFolder from "./folderUpload";
import DocumentManager from "./DocumentManager";
import UploadDoc from "./Firm Docs Shared With Client/UplodDoc";
import CreateFolderInFirm from "./Firm Docs Shared With Client/CreateFolder"
const App = () => {
  const [isDocumentForm, setIsDocumentForm] = useState(false);
  const [file, setFile] = useState(null);
  const [isFolderFormOpen, setIsFolderFormOpen] = useState(false);
  const [isFolderCreate,setIsFolderCreate]= useState(false);
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
const handleNewFolderClick= () => setIsFolderCreate((prev) => !prev);
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
  const [error, setError] = useState(null);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [loadingContent, setLoadingContent] = useState(false);

  const templateId = "67ea43c004956fca8db1d445";

  useEffect(() => {
    if (templateId) {
      fetchUnSealedFolders();
      fetchSealedFolders();
      fetchPrivateFolders();
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
 const [destinationPath, setDestinationPath] = useState("");
  const fetchClientUploadsContent = async () => {
    try {
      setLoadingContent(true);
      const [sealed, unsealed] = await Promise.all([
        axios.get(`http://localhost:8000/getSealedContent/${templateId}`),
        axios.get(`http://localhost:8000/getUnsealedContent/${templateId}`),
      ]);

      const tagSource = (items, source, parentId = "") =>
        items.map((item, index) => {
          const id = `${parentId}${index}`;
          if (item.type === "folder") {
            return {
              folder: item.name,
              isOpen: false,
              id,
              source,
              contents: tagSource(item.contents || [], source, `${id}-`),
            };
          }
          return { file: item.name, id, source };
        });

      return [
        ...tagSource(sealed.data.contents || [], "sealed"),
        ...tagSource(unsealed.data.contents || [], "unsealed"),
      ];
    } catch (err) {
      console.error(err);
      return [];
    } finally {
      setLoadingContent(false);
    }
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
                <SealedChip sealed={item.sealed} />
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
            }}
          >
            <span style={{ marginRight: "8px" }}>📄</span>
            <span style={{ fontWeight: 500 }}>{item.file}</span>
            <SealedChip sealed={item.sealed} />
          </div>
        );
      }
      return null;
    });

  const [clientFiles, setClientFiles] = useState([]);
  // useEffect(() => {

  //   const fetchClientFiles = async () => {
  //     try {
  //       const res = await axios.get("http://127.0.0.1:8000/api/files");
  //       if (res.data.success) {
  //         setClientFiles(res.data.data);
  //       }
  //     } catch (err) {
  //       console.error("Files fetch error", err);
  //     }
  //   };

  //   fetchClientFiles();
  // }, []);
  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/files");
        if (response.data.success) {
          // const basePath = "Firm Docs Shared With Client";
          // const filtered = response.data.data
          //   .filter(file => file.filePath.includes(basePath))
          //   .map(file => {
          //     // Get relative path starting from "Firm Docs Shared With Client"
          //     const pathParts = file.filePath.split(basePath);
          //     return {
          //       ...file,
          //       filePath: basePath + (pathParts[1] || "")
          //     };
          //   });
          const basePath = "Firm Docs Shared With Client";
          const filtered = response.data.data
            .filter((file) => file.filePath.includes(basePath))
            .map((file) => {
              const pathParts = file.filePath.split(basePath);
              return {
                ...file,
                filePath: basePath + (pathParts[1] || ""),
              };
            });

          setClientFiles(filtered);
          console.log(
            "Filtered Files Under Firm Docs Shared With Client:",
            filtered
          );
        } else {
          setError("Failed to fetch files");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchFileDetails();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!structFolder || !sealedStructFolder) return <div>Loading...</div>;

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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleCreateFolderClick}
              sx={{ color: "#e87800" }}
            >
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

      <Box mt={3}>
        <Typography variant="h6">Client Uploaded Documents</Typography>
        {renderContents(sealedStructFolder.folders, (newFolders) =>
          setSealedStructFolder({ ...sealedStructFolder, folders: newFolders })
        )}
        {renderContents(structFolder.folders, (newFolders) =>
          setStructFolder({ ...structFolder, folders: newFolders })
        )}
      </Box>
      <Box>
        <Typography variant="h6">Private</Typography>

        {renderContents(privateStructFolder.folders, (newFolders) =>
          setPrivateStructFolder({
            ...privateStructFolder,
            folders: newFolders,
          })
        )}
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
                htmlFor="fileInput"
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
                Upload
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
          <Typography variant="h6">Firm Docs Shared With Client</Typography>
          <DocumentManager
  files={clientFiles}
  onPathSelect={setDestinationPath}
  selectedPath={destinationPath}
/>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuAction("New Folder")}>
          New Folder
        </MenuItem>
        <MenuItem onClick={() => handleMenuAction("Edit")}>Edit</MenuItem>
        <MenuItem
          onClick={() =>
            contextItem?.folder !== "Client Uploaded Documents" &&
            handleMenuAction("Move")
          }
          disabled={contextItem?.folder === "Client Uploaded Documents"}
        >
          Move
        </MenuItem>
      </Menu>

      <UploadDrawer
        open={isDocumentForm}
        onClose={() => setIsDocumentForm(false)}
        file={file}
      />
      <UploadDoc
        open={uploadDocOpen}
        onClose={() => setUplaodDocOpen(false)}
        file={file}
      />
      <CreateFolder
        open={isFolderFormOpen}
        onClose={() => setIsFolderFormOpen(false)}
      />
      <CreateFolderInFirm
        open={isFolderCreate}
        onClose={() => setIsFolderCreate(false)}
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
