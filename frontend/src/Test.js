import React, { useEffect, useState } from "react";
import axios from "axios";
const Test = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchFileDetails = async () => {
          try {
            const response = await axios.get("http://127.0.0.1:8000/api/files");
            if (response.data.success) {
              setFiles(response.data.data);
              console.log("all folders and files",response.data.data)
            } else {
              setError("Failed to fetch files");
            }
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchFileDetails();
      }, []);


      const Folder = ({ name, content, onDelete, onEdit }) => {
        const [isOpen, setIsOpen] = useState(false);
    
        return (
            <div style={{ marginLeft: 20 }}>
                {/* 📁 Folder Name with Expand/Collapse */}
                <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                    📁 {name}
                </div>
    
                {isOpen && (
                    <div style={{ marginLeft: 20 }}>
                        {/* Render Subfolders */}
                        {Object.entries(content).map(([subfolder, subcontent]) =>
                            subfolder !== 'files' && <Folder key={subfolder} name={subfolder} content={subcontent} onDelete={onDelete} onEdit={onEdit} />
                        )}
    
                        {/* Render Files with Edit & Delete Icons */}
                        {/* {content.files && content.files.map((file) => (
                            <div key={file._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                📄 {file.filename}
                                {file.permissions.canDownload && (
                                    <a href={`http://127.0.0.1:8005/${file.filePath}/${file.filename}`} download>⬇️</a>
                                )}
                                {file.permissions.canUpdate && <button onClick={() => onEdit(file)}>✏️</button>}
                                {file.permissions.canDelete && <button onClick={() => onDelete(file)}>🗑️</button>}
                            </div>
                        ))} */}
                        {content.files && content.files
                            .filter(file => file.filename !== "#$default.txt") // Filter out default files
                            .map((file) => (
                                <div key={file._id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    📄 {file.filename}
                                    {file.permissions.canDownload && (
                                        <a href={`http://127.0.0.1:8000/${file.filePath}/${file.filename}`} download>⬇️</a>
                                    )}
                                    {file.permissions.canUpdate && <button onClick={() => onEdit(file)}>✏️</button>}
                                    {file.permissions.canDelete && <button onClick={() => onDelete(file)}>🗑️</button>}
                                </div>
                            ))}
                    </div>
                )}
            </div>
        );
    };

      const DocumentManager = ({ files }) => {
        const folderStructure = organizeFilesIntoFolders(files);
      
        // Delete File Handler
        const handleDelete = (file) => {
            console.log("Deleting file:", file);
            // Add API call to delete file
        };
      
        // Edit File Handler
        const handleEdit = (file) => {
            console.log("Editing file:", file);
            // Open modal or form for editing file details
        };
      
        return (
            <div>
                {Object.entries(folderStructure).map(([folder, content]) => (
                    <Folder key={folder} name={folder} content={content} onDelete={handleDelete} onEdit={handleEdit} />
                ))}
            </div>
        );
      };

      const organizeFilesIntoFolders = (files = []) => {
        if (!Array.isArray(files)) {
            console.error("Files data is not an array", files);
            return {};
        }
      
        const folderTree = {};
      
        files.forEach((file) => {
            if (!file.filePath) return; // Skip if filePath is missing
      
            const pathParts = file.filePath.split('/');
            let currentLevel = folderTree;
      
            pathParts.forEach((part, index) => {
                if (!currentLevel[part]) {
                    currentLevel[part] = {}; // Create an object for subfolders
                }
      
                if (index === pathParts.length - 1) {
                    // Last part -> Store the file in an array
                    if (!currentLevel[part].files) {
                        currentLevel[part].files = [];
                    }
                    currentLevel[part].files.push(file);
                }
      
                currentLevel = currentLevel[part];
            });
        });
      
        return folderTree;
      };

  return (
    <div>
        <div>
        <DocumentManager files={files}/>
        </div>
    </div>
  )
}

export default Test