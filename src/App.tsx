import { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import CaptionDisplay from './components/CaptionDisplay';
import { generateCaption } from './services/ai';
import { fileToBase64, validateImageFile } from './utils/image';
import { Sparkles } from 'lucide-react';
import type { ImageFile, Caption } from './types';
import Footer from './components/Footer';
import ImagePreviewer from './components/ImagePreviewer';
import Header from './components/Header';

const App = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  const [caption, setCaption] = useState<Caption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [captionStyle, setCaptionStyle] = useState<string>('creative');
  const [imageLoader, setImageLoader] = useState<boolean>(false);

  const handleImageUpload = async (imageFile: ImageFile) => {
    setImageLoader(true);
    setImage(imageFile);
    setError(null);
    setCaption(null);
    setCaptionStyle('creative');
    setImageLoader(false);
  };

  const onGenerateClick = async () => {
    setIsLoading(true);
    try {
      if (!validateImageFile((image as ImageFile).file)) {
        throw new Error('Invalid image format. Please use JPEG, PNG, GIF, or WebP.');
      }

      const base64Image = await fileToBase64((image as ImageFile).file);
      const generatedCaption = await generateCaption(base64Image, captionStyle);
      
      setCaption({
        text: JSON.parse((generatedCaption.match(/\[([\s\S]*?)\]/)?.[0] || "[]").replace(/'/g, '"')),
        timestamp: new Date()
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? 'Something went wrong, Please refresh the app!!' : 'Failed to generate caption!!';
      setError(errorMessage);
      console.error('Error processing image:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancelUpload = () => {
    setImage(null);
    setError(null);
    setCaption(null);
    setCaptionStyle('creative');
  };

  const onCaptionStyleChange = (style: string) => {
    setCaptionStyle(style);
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
        <Header />
        <div className='py-12 px-4 sm:px-6 lg:px-8'>
          <div className="max-w-6xl mx-auto ">
            <div className="text-center mb-12">
              <Sparkles className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                AI Caption Generator
              </h1>
              <p className="text-lg text-gray-600">
                Transform your artwork into words with AI-powered creative captions
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              {!image && <ImageUploader onImageUpload={handleImageUpload} />}
              
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {image && !error && (
                <>
                  <ImagePreviewer url={image.preview} loader={imageLoader} captionStyle={captionStyle} handleCancel={onCancelUpload} handleClick={onGenerateClick} handleChange={onCaptionStyleChange} />
                  <CaptionDisplay caption={caption} isLoading={isLoading} />
                </>
              )}

            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;