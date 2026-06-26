import * as React from "react";

// Sample picture data - replace with your actual picture data
const samplePictures = [
  { id: 1, url: './images/image.png', alt: "Nature Landscape" },
  { id: 2, url: "https://placehold.co/400x300/e9ecef/495057?text=Vibrant+City", alt: "City Skyline" },
  { id: 3, url: "https://placehold.co/400x300/dee2e6/495057?text=Mountain+Vista", alt: "Mountain View" },
  { id: 4, url: "https://placehold.co/400x300/ced4da/495057?text=Ocean+Waves", alt: "Ocean Waves" },
  { id: 5, url: "https://placehold.co/400x300/adb5bd/495057?text=Forest+Trees", alt: "Forest Trees" },
  { id: 6, url: "https://placehold.co/400x300/6c757d/ffffff?text=Desert+Sunset", alt: "Desert Sunset" },
  { id: 7, url: "https://placehold.co/400x300/495057/ffffff?text=Snowy+Peaks", alt: "Snowy Peaks" },
  { id: 8, url: "https://placehold.co/400x300/343a40/ffffff?text=Tropical+Beach", alt: "Tropical Beach" },
];

function PictureSelectionDialog({
  pictures = samplePictures,
  onPictureSelect,
  selectedPictureId,
}) {
  // Dialog is open by default
  const [open, setOpen] = React.useState(true);
  const [internalSelectedId, setInternalSelectedId] = React.useState(selectedPictureId || null);

  // Synchronize internalSelectedId if selectedPictureId prop changes externally
  React.useEffect(() => {
    setInternalSelectedId(selectedPictureId || null);
  }, [selectedPictureId]);

  const handleClose = () => {
    setOpen(false);
    // Optionally, you might want to reset internalSelectedId here or
    // call onPictureSelect with null if closing means no selection.
  };

  const handlePictureSelect = (pictureId) => {
    setInternalSelectedId(pictureId);
  };

  const handleSave = () => {
    if (internalSelectedId !== null && onPictureSelect) {
      onPictureSelect(internalSelectedId);
    }
    handleClose();
  };

  // Helper function to conditionally join Tailwind classes, replacing 'cn'
  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
  };

  // Inline SVG for 'X' icon (Close)
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      {/* Dialog Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-2xl">
            
            {/* Dialog Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Select Picture</h2>
                <p className="text-sm text-gray-600 mt-1">Choose from the available options below</p>
              </div>
              <button
                className="flex items-center justify-center w-10 h-10 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleClose}
                aria-label="Close dialog"
              >
                <CloseIcon />
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
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  onClick={handleClose}
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
                  Select Picture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PictureSelectionDialog;
