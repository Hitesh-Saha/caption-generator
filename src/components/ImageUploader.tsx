import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageUp } from 'lucide-react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageUpload: (image: ImageFile) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onImageUpload({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <ImageUp className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? "Drop your image here..."
          : "Drag 'n' drop an image, or click to select"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        Supports: JPG, PNG, GIF
      </p>
    </div>
  );
}