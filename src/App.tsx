import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CaptionDisplay } from './components/CaptionDisplay';
import { generateCaption } from './services/ai';
import { fileToBase64, validateImageFile } from './utils/image';
import { Sparkles } from 'lucide-react';
import type { ImageFile, Caption } from './types';

function App() {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [caption, setCaption] = useState<Caption | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (imageFile: ImageFile) => {
    setImage(imageFile);
    setError(null);
    setCaption(null)
  };

  const handleClick = async () => {
    setIsLoading(true);
    try {
      if (!validateImageFile((image as ImageFile).file)) {
        throw new Error('Invalid image format. Please use JPEG, PNG, GIF, or WebP.');
      }

      const base64Image = await fileToBase64((image as ImageFile).file);
      const generatedCaption = await generateCaption(base64Image);
      
      setCaption({
        text: generatedCaption,
        timestamp: new Date()
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate caption';
      setError(errorMessage);
      console.error('Error processing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setImage(null);
    setError(null);
    setCaption(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Caption Generator
          </h1>
          <p className="text-lg text-gray-600">
            Transform your artwork into words with AI-powered creative captions
          </p>
        </div>

        <div className="space-y-8">
          <ImageUploader onImageUpload={handleImageUpload} />
          
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {image && !error && (
            <div className='flex flex-col gap-3'>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src={image.preview}
                  alt="Uploaded artwork"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className='flex flex-row gap-4'>
                <button className='rounded-lg w-36 bg-red-600 p-3 text-white uppercase font-bold hover:bg-red-950' onClick={handleCancel}>Cancel</button>
                <button className='rounded-lg w-52 bg-blue-700 p-3 text-white uppercase font-bold hover:bg-blue-950' onClick={handleClick}>Generate Caption</button>
              </div>
            </div>
          )}

          <CaptionDisplay caption={caption} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;