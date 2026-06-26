import React, { useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast'; // ✅ Import toast and Toaster
import { useNavigate } from "react-router-dom";

// Picture Selection Dialog Component
const PictureSelectionDialog = ({
  pictures,
  onPictureSelect,
  selectedPictureId,
  open,
  onClose
}) => {
  const [internalSelectedId, setInternalSelectedId] = React.useState(selectedPictureId || null);
  const navigate = useNavigate();

  React.useEffect(() => {
    setInternalSelectedId(selectedPictureId || null);
  }, [selectedPictureId]);

  const handlePictureSelect = (pictureId) => {
    setInternalSelectedId(pictureId);
  };

  const handleSave = () => {
    if (internalSelectedId !== null && onPictureSelect) {
      onPictureSelect(internalSelectedId);
    }
      
    onClose();

    // Use toast.promise for a better download UX
    toast.promise(
      fetch("https://resume-to-portfolio-yrlv.onrender.com/download-portfolio")
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "portfolio.zip"; // name for downloaded file
          document.body.appendChild(a);
          a.click();
          a.remove();
        }),
      {
        loading: 'Generating and downloading portfolio...',
        success: <b>Portfolio downloaded successfully!</b>,
        error: <b>Could not download portfolio.</b>,
      }
    );
  };

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  // Clean Close Icon
  const CloseIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );

  // Professional Check Icon
  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
        
        {/* Dialog Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Select Template</h2>
            <p className="text-sm text-gray-600 mt-1">Choose from the available options below</p>
          </div>
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full text-red-600 hover:text-red-700 bg-black transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <CloseIcon className="text-red-600"/>
          </button>
        </div>

        {/* Picture Grid */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className={classNames(
                  "group relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ease-out",
                  "hover:shadow-lg hover:-translate-y-1",
                  internalSelectedId === picture.id
                    ? "ring-2 ring-blue-500 shadow-lg transform scale-[1.02]"
                    : "border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md",
                  "bg-white"
                )}
                onClick={() => handlePictureSelect(picture.id)}
              >
                <div className="relative">
                  <img
                    src={picture.url || "https://placehold.co/400x300/f8f9fa/495057?text=No+Image"}
                    alt={picture.alt}
                    className="w-full h-40 sm:h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300/f8f9fa/dc3545?text=Image+Error";
                    }}
                  />
                  
                  {/* Selection indicator */}
                  {internalSelectedId === picture.id && (
                    <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full p-2 flex items-center justify-center shadow-lg">
                      <CheckIcon />
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-blue-600 mb-1">ID: {picture.id}</div>
                        <div className="text-sm font-medium text-gray-900 leading-tight">{picture.alt}</div>
                      </div>
                      {internalSelectedId === picture.id && (
                        <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                          Selected
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dialog Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600">
            {internalSelectedId ? `Selected: Picture ${internalSelectedId}` : 'No picture selected'}
          </div>
          <div className="flex gap-3">
            <button
              className="px-4 py-2 text-sm font-medium text-red-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:border-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={classNames(
                "px-6 py-2 text-sm font-medium rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                internalSelectedId !== null
                  ? "text-white bg-blue-600 hover:bg-blue-700 hover:shadow-md"
                  : "text-gray-400 bg-gray-200 cursor-not-allowed"
              )}
              onClick={handleSave}
              disabled={internalSelectedId === null}
            >
              Select Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sample picture data
const samplePictures = [
  { id: 1, url: "https://i.ibb.co/TMKJKDvC/Screenshot-2025-08-26-142138.png", alt: "Template 1" },
  { id: 2, url: "https://placehold.co/400x300/e9ecef/495057?text=Template2", alt: " (soon posted...)" },
  { id: 3, url: "https://placehold.co/400x300/dee2e6/495057?text=Template3", alt: " (soon posted...)"},
  { id: 4, url: "https://placehold.co/400x300/ced4da/495057?text=Template4", alt: " (soon posted...)" },
];

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);
  const [showPictureDialog, setShowPictureDialog] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState(null);
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "application/pdf" ||
        selectedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        selectedFile.type === "application/msword")
    ) {
      setFile(selectedFile);
      toast.success(`${selectedFile.name} selected!`);
    } else {
      setFile(null); // Clear file if invalid type
      toast.error("Please upload only PDF or DOC/DOCX files.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        droppedFile.type === "application/msword")
    ) {
      setFile(droppedFile);
      toast.success(`${droppedFile.name} selected!`);
    } else {
      setFile(null); // Clear file if invalid type
      toast.error("Please upload only PDF or DOC/DOCX files.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const uploadPromise = fetch("https://resume-to-portfolio-yrlv.onrender.com/api/uploads", {
      method: "POST",
      body: formData,
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }
      return data;
    });

    toast.promise(uploadPromise, {
      loading: 'Uploading file...',
      success: (data) => {
        setUploadedUrl(data.url);
        setShowPictureDialog(true);
        return <b>File uploaded successfully!</b>;
      },
      error: (err) => {
        return <b>{err.message}</b>;
      },
    });
  };

  const handlePictureSelect = (pictureId) => {
    setSelectedPicture(pictureId);
    toast.success(`Template ${pictureId} selected!`);
  };

  const handleDialogClose = () => {
    setShowPictureDialog(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      {/* Toaster component with custom styling for a black background */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#000', // Black background
            color: '#fff',      // White text
          },
        }}
      />

      <div className="w-full max-w-lg bg-gradient-to-br from-gray-900 via-black to-gray-800 border border-gray-700 shadow-2xl rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
          Upload Your Resume
        </h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Upload your PDF or DOC files — powered by AI
        </p>

        {/* Drop Zone */}
        <div
          className="mt-8 border-2 border-dashed border-gray-600 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.7)] transition"
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {/* Upload Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-cyan-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>

          <p className="mt-3 text-gray-300 font-semibold text-lg">
            Drag & Drop or Click to Upload
          </p>
          <p className="text-sm text-gray-500">
            Supports PDF, DOC, DOCX files only
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-900 flex items-center justify-between">
            <div>
              <p className="text-gray-100 font-medium">{file.name}</p>
              <p className="text-gray-500 text-sm">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                toast('File removed.', { icon: '👋' });
              }}
              className="text-red-500 hover:text-red-400 text-sm font-semibold"
            >
              ✕ Remove
            </button>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full mt-6 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:opacity-90 text-white font-bold py-3 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.6)] transition"
        >
          Upload File
        </button>

        {/* Uploaded File Link */}
        {uploadedUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-400">Uploaded Successfully:</p>
            <a
              href={uploadedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline break-all"
            >
              {uploadedUrl}
            </a>
          </div>
        )}

        {/* Selected Picture Info */}
        {selectedPicture && (
          <div className="mt-6 p-4 border border-cyan-500/30 rounded-lg bg-cyan-900/20">
            <p className="text-cyan-400 text-sm font-medium">
              Selected Picture: ID {selectedPicture}
            </p>
          </div>
        )}
      </div>

      {/* Picture Selection Dialog */}
      <PictureSelectionDialog
        pictures={samplePictures}
        onPictureSelect={handlePictureSelect}
        selectedPictureId={selectedPicture}
        open={showPictureDialog}
        onClose={handleDialogClose}
      />
    </div>
  );
}
