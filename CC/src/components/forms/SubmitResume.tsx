'use client';

import React, { useState } from 'react';
import { UploadButton } from '@/lib/uploadthing';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'; // Importing the icon

interface FileDetails {
  fileName: string;
  // Add other properties if needed
}

const SubmitResume = () => {
  // State to store the uploaded file information
  const [uploadedFile, setUploadedFile] = useState<FileDetails | null>(null);

  const handleUploadComplete = (res: any) => {
    console.log('Files: ', res);
    // Update the state with the uploaded file's details
    setUploadedFile(res);
    alert('Resume received!');
  };

  const handleUploadError = (error: Error) => {
    alert(`ERROR! ${error.message}`);
  };

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-black mb-4">
        Please Submit Your Resume
      </h1>
      <UploadButton
        endpoint="fileUploader"
        className="ut-button:bg-green ut-button:ut-readying:bg-green2 ut-upload-icon:text-xl"
        appearance={{
          button:
            'ut-ready:bg-green2 ut-uploading:cursor-not-allowed rounded-lg bg-green hover:bg-green2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green',
          allowedContent:
            'flex h-12 flex-col items-center justify-center px-2 text-gray-700',
        }}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
      {uploadedFile && (
        <div className="mt-4 flex items-center">
          <InsertDriveFileIcon />
          <span className="ml-2">File attached</span>
        </div>
      )}
    </main>
  );
};

export default SubmitResume;
