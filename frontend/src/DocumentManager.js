// DocumentManager.js (optional file)
import React from "react";

const Folder = ({ name, content, onDelete, onEdit, currentPath = "", onPathSelect, selectedPath }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const fullPath = currentPath ? `${currentPath}/${name}` : name;
  const isSelected = selectedPath === fullPath;

  return (
    <div style={{ marginLeft: 20 }}>
      <div
        onClick={() => {
          setIsOpen(!isOpen);
          onPathSelect(fullPath); // Notify parent of selected path
        }}
        style={{
          cursor: "pointer",
          fontWeight: "bold",
          backgroundColor: isSelected ? "#e0f7fa" : "transparent",
          padding: "4px",
          borderRadius: "4px",
        }}
      >
        📁 {name} {isSelected && "✅"}
      </div>

      {isOpen && (
        <div style={{ marginLeft: 20 }}>
          {Object.entries(content).map(([subfolder, subcontent]) =>
            subfolder !== "files" ? (
              <Folder
                key={subfolder}
                name={subfolder}
                content={subcontent}
                currentPath={fullPath}
                onDelete={onDelete}
                onEdit={onEdit}
                onPathSelect={onPathSelect}
                selectedPath={selectedPath}
              />
            ) : null
          )}
          {content.files &&
            content.files
              .filter((file) => file.filename !== "#$default.txt")
              .map((file) => (
                <div key={file._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  📄 {file.filename}
                  {file.permissions.canDownload && (
                    <a href={`http://127.0.0.1:8000/${file.filePath}/${file.filename}`} download>
                      ⬇️
                    </a>
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

// const Folder = ({ name, content, onDelete, onEdit }) => {
//   const [isOpen, setIsOpen] = React.useState(false);

//   return (
//     <div style={{ marginLeft: 20 }}>
//       <div onClick={() => setIsOpen(!isOpen)} style={{ cursor: "pointer", fontWeight: "bold" }}>
//         📁 {name}
//       </div>
//       {isOpen && (
//         <div style={{ marginLeft: 20 }}>
//           {Object.entries(content).map(([subfolder, subcontent]) =>
//             subfolder !== "files" ? (
//               <Folder key={subfolder} name={subfolder} content={subcontent} onDelete={onDelete} onEdit={onEdit} />
//             ) : null
//           )}
//           {content.files &&
//             content.files
//               .filter((file) => file.filename !== "#$default.txt")
//               .map((file) => (
//                 <div key={file._id} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//                   📄 {file.filename}
//                   {file.permissions.canDownload && (
//                     <a href={`http://127.0.0.1:8000/${file.filePath}/${file.filename}`} download>
//                       ⬇️
//                     </a>
//                   )}
//                   {file.permissions.canUpdate && <button onClick={() => onEdit(file)}>✏️</button>}
//                   {file.permissions.canDelete && <button onClick={() => onDelete(file)}>🗑️</button>}
//                 </div>
//               ))}
//         </div>
//       )}
//     </div>
//   );
// };

// const DocumentManager = ({ files }) => {
//   const folderStructure = organizeFilesIntoFolders(files);
//   console.log("janvi",folderStructure)

//   const handleDelete = (file) => {
//     console.log("Deleting file:", file);
//   };

//   const handleEdit = (file) => {
//     console.log("Editing file:", file);
//   };

//   return (
//     <div>
//       {Object.entries(folderStructure).map(([folder, content]) => (
//         <Folder key={folder} name={folder} content={content} onDelete={handleDelete} onEdit={handleEdit} />
//       ))}
//     </div>
//   );
// };
const DocumentManager = ({ files, onPathSelect, selectedPath }) => {
  const folderStructure = organizeFilesIntoFolders(files);

  const handleDelete = (file) => {
    console.log("Deleting file:", file);
  };

  const handleEdit = (file) => {
    console.log("Editing file:", file);
  };

  return (
    <div>
      {Object.entries(folderStructure).map(([folder, content]) => (
        <Folder
          key={folder}
          name={folder}
          content={content}
          onDelete={handleDelete}
          onEdit={handleEdit}
          currentPath=""
          onPathSelect={onPathSelect}
          selectedPath={selectedPath}
        />
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
    if (!file.filePath) return;

    const pathParts = file.filePath.split("/");
    let currentLevel = folderTree;

    pathParts.forEach((part, index) => {
      if (!currentLevel[part]) {
        currentLevel[part] = {};
      }

      if (index === pathParts.length - 1) {
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




export default DocumentManager;
