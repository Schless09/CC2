'use client';
import { FileUploadFieldProps } from '@/lib/types';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useRef, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

const FileUploadField = ({
  control,
  setFiles,
  title,
  error,
  name = 'fileUrl',
  disabled = false,
}: FileUploadFieldProps) => {
  const [selectedFile, setSelectedFile] = useState('');
  const fileInputRef: React.RefObject<HTMLInputElement> = useRef(null);

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (!file.type.includes('image') && !file.type.includes('pdf')) {
        toast({
          variant: 'destructive',
          description: 'Please select an image (.jpg, .png, etc.) or a PDF',
        });
        return;
      }
      setSelectedFile(file.name);
      setFiles(Array.from(e.target.files));
      reader.onload = async (event) => {
        const fileUrl = event.target?.result?.toString() || '';
        fieldChange(fileUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef?.current?.click();
    }
  };

  const handleDelete = () => {
    setSelectedFile('');
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Clear the file input
    }
    // Reset the form field value
    control.setValue(name, '');
  };

  return (
    <div className="flex items-center space-x-2">
      <Controller
        name={name}
        control={control}
        render={({ field: { onBlur, onChange } }) => (
          <Button
            type='button'
            variant='ghost'
            onBlur={onBlur}
            onClick={handleClick}
            className={`referral-selector-upload-btn flex-grow ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled}
          >
            {selectedFile ? <CheckIcon /> : <FileUploadIcon />}
            <span>{selectedFile ? selectedFile : title}</span>
            <input
              type='file'
              ref={fileInputRef}
              hidden
              onChange={(e) => handleFile(e, onChange)}
              disabled={disabled}
            />
          </Button>
        )}
      />
      {selectedFile && (
        <Button
          type='button'
          variant='ghost'
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
          title="Delete file"
        >
          <DeleteIcon />
        </Button>
      )}
      {error && (
        <p className='text-[13px] text-[#f44336] !mt-2 !ml-[14px]'>{error}</p>
      )}
    </div>
  );
};

export default FileUploadField;