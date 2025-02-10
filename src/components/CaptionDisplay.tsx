import { Caption } from '../types';
import { Quote } from 'lucide-react';

interface CaptionDisplayProps {
  caption: Caption | null;
  isLoading: boolean;
}

export function CaptionDisplay({ caption, isLoading }: CaptionDisplayProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse flex flex-col items-center space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (!caption) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <Quote className="h-8 w-8 text-blue-500 mb-4" />
      <p className="text-lg text-gray-800 italic">
        {caption.text}
      </p>
      <p className="text-sm text-gray-500 mt-2">
        Generated on {caption.timestamp.toLocaleString()}
      </p>
    </div>
  );
}